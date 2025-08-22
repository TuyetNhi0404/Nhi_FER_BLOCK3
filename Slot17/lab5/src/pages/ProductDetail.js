import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useToast } from '../context/ToastContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const { addToFavourites, isFavourite } = useFavourites();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulate fetching product detail from db.json
    const fetchProduct = () => {
      const products = [
        { id: 0, name: "Uthappizza", image: "/img/image1.png", price: "4.99", description: "A unique combination of Indian Uthappam and Italian pizza." },
        { id: 1, name: "Zucchipakoda", image: "/img/image2.png", price: "1.99", description: "Deep fried Zucchini with chickpea batter." },
        { id: 2, name: "Vadonut", image: "/img/image3.png", price: "1.99", description: "A combination of vada and donut." },
        { id: 3, name: "ElaiCheese Cake", image: "/img/image4.png", price: "2.99", description: "New York Style Cheesecake with Indian cardamoms." },
        { id: 4, name: "Lobster Thermidor", image: "/img/image5.png", price: "29.99", description: "Succulent lobster baked in a creamy white wine sauce, served with herbs." },
        { id: 5, name: "Wagyu Steak", image: "/img/image6.png", price: "49.99", description: "Premium Japanese Wagyu beef grilled to perfection, melt-in-your-mouth texture." }
      ];
      
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
    };

    fetchProduct();
  }, [id]);

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

  const handleBackToList = () => {
    navigate('/products');
  };

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found</h2>
        <Button onClick={handleBackToList} variant="primary">
          Back to Products
        </Button>
      </Container>
    );
  }

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
    borderRadius: '15px'
  };

  const imageStyle = {
    height: '400px',
    objectFit: 'cover',
    borderRadius: '10px'
  };

  const priceStyle = {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: '2rem'
  };

  const buttonStyle = {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 20px',
    margin: '5px'
  };

  const favouriteButtonStyle = {
    backgroundColor: isFavourite(product.id) ? colors.accent : colors.secondary,
    borderColor: isFavourite(product.id) ? colors.accent : colors.secondary,
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 20px',
    margin: '5px'
  };

  return (
    <div style={pageStyle}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow-lg" style={cardStyle}>
              <Card.Body className="p-4">
                <Row>
                  <Col md={6} className="mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-100"
                      style={imageStyle}
                    />
                  </Col>
                  
                  <Col md={6}>
                    <div className="h-100 d-flex flex-column">
                      <h1 className="mb-3">{product.name}</h1>
                      <p className="lead mb-4">{product.description}</p>
                      
                      <div className="mb-4">
                        <h3 style={priceStyle}>${parseFloat(product.price).toFixed(2)}</h3>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="d-flex flex-wrap justify-content-start">
                          <Button
                            style={buttonStyle}
                            onClick={handleAddToCart}
                          >
                            Add to Cart
                          </Button>
                          
                          <Button
                            style={favouriteButtonStyle}
                            onClick={handleAddToFavourites}
                          >
                            {isFavourite(product.id) ? 'Browse Favourites' : 'Add to Favourite'}
                          </Button>
                          
                          <Button
                            variant="outline-secondary"
                            onClick={handleBackToList}
                            style={{ padding: '10px 20px', margin: '5px' }}
                          >
                            Back to List
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;