import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, InputGroup, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const { colors } = useTheme();
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      showToast('Item removed from cart', 'info');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    showToast('Item removed from cart', 'info');
  };

  const handleClearCart = () => {
    clearCart();
    showToast('Cart cleared', 'info');
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      showToast('Please login to proceed with checkout', 'warning');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

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

  const totalStyle = {
    backgroundColor: colors.primary,
    color: 'white',
    padding: '1rem',
    borderRadius: '10px',
    fontWeight: 'bold'
  };

  return (
    <div style={pageStyle}>
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4 text-center">🛒 Shopping Cart</h2>
          </Col>
        </Row>

        {items.length === 0 ? (
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card style={cardStyle} className="text-center p-4">
                <Card.Body>
                  <h4>Your cart is empty</h4>
                  <p className="mb-4">Start adding some delicious items to your cart!</p>
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
            <Col lg={8}>
              <Card style={cardStyle} className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Cart Items ({items.length})</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <ListGroup variant="flush">
                    {items.map((item) => (
                      <ListGroup.Item
                        key={item.id}
                        style={{
                          backgroundColor: colors.surface,
                          color: colors.text,
                          borderColor: colors.secondary
                        }}
                      >
                        <Row className="align-items-center">
                          <Col md={2} className="d-flex justify-content-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded"
                              style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover'
                              }}
                            />
                          </Col>
                          <Col md={4}>
                            <h6 className="mb-1">{item.name}</h6>
                            <small className="text-muted">
                              ${parseFloat(item.price).toFixed(2)} each
                            </small>
                          </Col>
                          <Col md={3}>
                            <InputGroup size="sm">
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <Form.Control
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                                }
                                className="text-center"
                                min="1"
                              />
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </InputGroup>
                          </Col>
                          <Col md={2}>
                            <strong>
                              ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </strong>
                          </Col>
                          <Col md={1} className="text-center">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              ✕
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>

              <div className="d-flex gap-2 mb-4">
                <Button
                  variant="outline-secondary"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </Col>

            <Col lg={4}>
              <Card style={cardStyle}>
                <Card.Header>
                  <h5 className="mb-0">Order Summary</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <hr />
                  <div style={totalStyle} className="text-center mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Total:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                  <Button
                    style={buttonStyle}
                    className="w-100"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;
