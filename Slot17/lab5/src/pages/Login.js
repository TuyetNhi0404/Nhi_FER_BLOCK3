import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const { colors } = useTheme();
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await login(formData.username, formData.password);
    setIsSubmitting(false);

    if (success) {
      showToast('Login successful! Welcome back!', 'success');
      navigate(-1); // trở về trang trước (vd Checkout)
    } else {
      showToast('Invalid username or password', 'danger');
      setErrors({
        username: ' ',
        password: 'Invalid credentials'
      });
    }
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

  const inputStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.secondary,
    color: colors.text
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
        <Row className="justify-content-center">
          <Col lg={5} md={6}>
            <Card className="shadow-lg" style={cardStyle}>
              <Card.Header className="text-center py-4">
                <h2>Welcome Back</h2>
                <p className="mb-0">Sign in to your account</p>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      style={inputStyle}
                      isInvalid={!!errors.username}
                      placeholder="Enter your username"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      style={inputStyle}
                      isInvalid={!!errors.password}
                      placeholder="Enter your password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2 mb-3">
                    <Button
                      type="submit"
                      size="lg"
                      style={buttonStyle}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="mb-0">
                      Don&apos;t have an account?{' '}
                      <Link to="/register" style={{ color: colors.secondary }}>
                        Register here
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
