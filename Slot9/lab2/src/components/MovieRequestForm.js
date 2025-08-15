import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { allGenres } from '../data/movies';

const MovieRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.genre) {
      newErrors.genre = 'Please select a genre';
    }

    const year = parseInt(formData.year);
    if (!formData.year || year <= 1900 || year > new Date().getFullYear()) {
      newErrors.year = 'Year must be greater than 1900 and not in the future';
    }

    const duration = parseInt(formData.duration);
    if (!formData.duration || duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    if (!formData.description.trim() || formData.description.length < 30) {
      newErrors.description = 'Description must be at least 30 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit();
      setFormData({
        title: '',
        genre: '',
        year: '',
        duration: '',
        description: ''
      });
      setErrors({});
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Container className="py-4" style={{marginTop: '76px'}}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="movie-card">
            <Card.Header className="modal-header">
              <h3 className="mb-0">Movie Request Form</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Movie Title *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter movie title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Genre *</Form.Label>
                      <Form.Select
                        value={formData.genre}
                        onChange={(e) => handleChange('genre', e.target.value)}
                        isInvalid={!!errors.genre}
                      >
                        <option value="">Select genre...</option>
                        {allGenres.filter(g => g !== 'All').map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.genre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Year *</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="e.g., 2023"
                        min="1901"
                        max={new Date().getFullYear()}
                        value={formData.year}
                        onChange={(e) => handleChange('year', e.target.value)}
                        isInvalid={!!errors.year}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.year}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Duration (minutes) *</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="e.g., 120"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    isInvalid={!!errors.duration}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.duration}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description * (minimum 30 characters)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Describe the movie plot, cast, or why you want to see it..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    isInvalid={!!errors.description}
                  />
                  <Form.Text className="text-muted">
                    {formData.description.length}/30 characters minimum
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-custom-success"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

MovieRequestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default MovieRequestForm;