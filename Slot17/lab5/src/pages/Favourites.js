import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFavourites } from '../context/FavouritesContext';
import ProductCard from '../components/ProductCard';

const Favourites = () => {
  const { colors } = useTheme();
  const { items, clearFavourites } = useFavourites();

  const pageStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    minHeight: '100vh',
    paddingTop: '2rem'
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    color: colors.text,
    borderColor: colors.secondary,
    borderWidth: '2px',
    borderRadius: '10px'
  };

  const buttonStyle = {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    color: 'white',
    fontWeight: 'bold'
  };

  return (
    <div style={pageStyle}>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>❤️ My Favourites ({items.length})</h2>
              {items.length > 0 && (
                <Button
                  variant="outline-danger"
                  onClick={clearFavourites}
                >
                  Clear All Favourites
                </Button>
              )}
            </div>
          </Col>
        </Row>

        {items.length === 0 ? (
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card style={cardStyle} className="text-center p-4">
                <Card.Body>
                  <h4>No favourites yet</h4>
                  <p className="mb-4">Start adding your favorite dishes to see them here!</p>
                  <Button
                    as={Link}
                    to="/products"
                    style={buttonStyle}
                    size="lg"
                  >
                    Browse Products
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            {items.map(product => (
              <Col lg={4} md={6} className="mb-4" key={product.id}>
                <ProductCard product={product} hideFavouriteButton />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Favourites;