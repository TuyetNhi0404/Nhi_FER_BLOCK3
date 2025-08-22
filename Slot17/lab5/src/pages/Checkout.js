import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Checkout = () => {
  const { colors } = useTheme();
  const { items, clearCart, getTotalPrice } = useCart();
  const { user, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    clearCart();
    showToast('🎉 Order placed successfully! Thank you for your purchase!', 'success');
    navigate('/');
  };

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
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
            <h2 className="text-center mb-4">🛒 Checkout</h2>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card style={cardStyle} className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Order Summary</h5>
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
                        <Col md={2}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ height: '60px', objectFit: 'cover' }}
                          />
                        </Col>
                        <Col md={6}>
                          <h6 className="mb-1">{item.name}</h6>
                          <small className="text-muted">${parseFloat(item.price).toFixed(2)} each</small>
                        </Col>
                        <Col md={2}>
                          <span>Qty: {item.quantity}</span>
                        </Col>
                        <Col md={2}>
                          <strong>${(parseFloat(item.price) * item.quantity).toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card style={cardStyle}>
              <Card.Header>
                <h5 className="mb-0">Delivery Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Name:</strong>
                      <p className="mb-0">{user.name}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Phone:</strong>
                      <p className="mb-0">{user.phone || 'Not provided'}</p>
                    </div>
                  </Col>
                </Row>
                <div className="mb-3">
                  <strong>Delivery Address:</strong>
                  <p className="mb-0">{user.address || 'Please update your address in profile'}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card style={cardStyle}>
              <Card.Header>
                <h5 className="mb-0">Payment Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee:</span>
                  <span>$2.99</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <hr />
                <div style={totalStyle} className="text-center mb-3">
                  <div className="d-flex justify-content-between">
                    <span>Total:</span>
                    <span>${(getTotalPrice() + 2.99 + (getTotalPrice() * 0.1)).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h6>Payment Method:</h6>
                  <p className="mb-0">💳 Cash on Delivery</p>
                </div>
                
                <Button
                  style={buttonStyle}
                  className="w-100 mb-2"
                  size="lg"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
                
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={() => navigate('/cart')}
                >
                  Back to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;