import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import FoodCarousel from '../components/FoodCarousel';

const Home = () => {
  const { colors } = useTheme();

  const heroStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    minHeight: '100vh',
    paddingTop: '2rem'
  };

  const welcomeStyle = {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: `2px solid ${colors.secondary}`,
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const buttonStyle = {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 30px',
    fontSize: '1.1rem'
  };

  return (
    <div style={heroStyle}>
      <Container fluid style={{ padding: "0 100px" }}>
        <Row className="justify-content-center">
          <Col lg={10}>
            <FoodCarousel />
          </Col>
        </Row>
        
        <Row className="justify-content-center">
          <Col lg={8}>
            <div style={welcomeStyle}>
              <h1 className="display-4 mb-4">Welcome to Food Ordering</h1>
              <Button
                as={Link}
                to="/products"
                size="lg"
                style={buttonStyle}
                className="me-3"
              >
                Browse Products
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="outline-secondary"
                size="lg"
              >
                Register Now
              </Button>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col md={4} className="text-center mb-3">
            <div style={welcomeStyle}>
              <h3>🍕 Fresh Food</h3>
              <p>Made with the freshest ingredients daily</p>
            </div>
          </Col>
          <Col md={4} className="text-center mb-3">
            <div style={welcomeStyle}>
              <h3>🚚 Fast Delivery</h3>
              <p>Quick and reliable delivery to your door</p>
            </div>
          </Col>
          <Col md={4} className="text-center mb-3">
            <div style={welcomeStyle}>
              <h3>⭐ Best Quality</h3>
              <p>Premium quality food at affordable prices</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;