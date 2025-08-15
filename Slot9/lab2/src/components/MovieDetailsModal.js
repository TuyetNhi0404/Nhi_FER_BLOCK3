import React from 'react';
import { Modal, Row, Col, Badge, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

const MovieDetailsModal = ({ movie, show, onHide }) => {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <div className="movie-poster mb-3 text-center">
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
          </Col>
          <Col md={8}>
            <h5>Description</h5>
            <p>{movie.description}</p>
            
            <h5>Movie Details</h5>
            <ul className="list-unstyled">
              <li><strong>Genre:</strong> <Badge className="badge-custom">{movie.genre}</Badge></li>
              <li><strong>Year:</strong> {movie.year}</li>
              <li><strong>Country:</strong> {movie.country}</li>
              <li><strong>Duration:</strong> {movie.duration} minutes</li>
            </ul>

            <h5>Showtimes</h5>
            <p className="text-muted">
              Daily: 10:00 AM, 2:00 PM, 6:00 PM, 9:30 PM
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

MovieDetailsModal.propTypes = {
  movie: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default MovieDetailsModal;