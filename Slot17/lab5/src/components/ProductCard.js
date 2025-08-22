import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product, hideFavouriteButton = false }) => {
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const { addToFavourites, isFavourite } = useFavourites();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart', 'success');
  };

  const handleAddToFavourites = () => {
    if (isFavourite(product.id)) {
      navigate('/favourites');
    } else {
      addToFavourites(product);
      showToast('Added to favourites', 'success');
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    color: colors.text,
    borderColor: colors.secondary,
    borderWidth: '2px',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    height: '100%'
  };

  const imageStyle = {
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0'
  };

  const priceStyle = {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: '1.2rem'
  };

  const buttonStyle = {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    color: 'white',
    fontWeight: 'bold'
  };

  const favouriteButtonStyle = {
    backgroundColor: isFavourite(product.id) ? colors.accent : colors.secondary,
    borderColor: isFavourite(product.id) ? colors.accent : colors.secondary,
    color: 'white',
    fontWeight: 'bold'
  };

  return (
    <Card className="shadow-sm h-100" style={cardStyle}>
      <Card.Img variant="top" src={product.image} alt={product.name} style={imageStyle} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{product.name}</Card.Title>
        <Card.Text className="flex-grow-1 mb-3">
          {product.description}
        </Card.Text>
        <div className="mb-3">
          <h5 className="mb-0" style={priceStyle}>
            ${parseFloat(product.price).toFixed(2)}
          </h5>
        </div>
        <Row className="g-2 mt-auto">
          <Col>
            <Button variant="outline-success" size="sm" className="w-100" onClick={handleViewDetails}>
              View Details
            </Button>
          </Col>
          <Col>
            <Button size="sm" className="w-100" style={buttonStyle} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Col>
          {!hideFavouriteButton && (
            <Col>
              <Button
                size="sm"
                className="w-100"
                style={favouriteButtonStyle}
                onClick={handleAddToFavourites}
              >
                {isFavourite(product.id) ? 'Browse Favourites' : 'Add to Favourite'}
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
