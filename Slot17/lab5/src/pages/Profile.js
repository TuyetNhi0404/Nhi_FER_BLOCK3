import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { colors } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
    borderRadius: '15px'
  };

  const buttonStyle = {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    color: 'white',
    fontWeight: 'bold'
  };

  if (!user) {
    return (
      <div style={pageStyle}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card style={cardStyle} className="text-center p-4">
                <Card.Body>
                  <h4>Please log in to view your profile</h4>
                  <Button
                    onClick={() => navigate('/login')}
                    style={buttonStyle}
                    size="lg"
                  >
                    Login
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-lg" style={cardStyle}>
              <Card.Header className="text-center py-4">
                <h2>👤 My Profile</h2>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Name:</strong>
                      <p className="mb-0">{user.name}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Email:</strong>
                      <p className="mb-0">{user.email}</p>
                    </div>
                  </Col>
                </Row>
                
                {user.phone && (
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <strong>Phone:</strong>
                        <p className="mb-0">{user.phone}</p>
                      </div>
                    </Col>
                  </Row>
                )}
                
                {user.address && (
                  <Row>
                    <Col xs={12}>
                      <div className="mb-4">
                        <strong>Address:</strong>
                        <p className="mb-0">{user.address}</p>
                      </div>
                    </Col>
                  </Row>
                )}

                <div className="text-center">
                  <Button
                    variant="outline-danger"
                    onClick={handleLogout}
                    size="lg"
                  >
                    Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;