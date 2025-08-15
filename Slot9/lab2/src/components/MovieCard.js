import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {  Eye } from 'lucide-react';

const MovieCard = ({ movie, onAddToFavourite, isFavourite, onShowDetails }) => {
  return (
    <Card className="movie-card h-100">
      <div className="movie-poster text-center mb-2">
        <img
          src={movie.poster}
          alt={movie.title}
          style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "8px" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-success fw-bold">{movie.title}</Card.Title>
        <Card.Text className="flex-grow-1">
          {movie.description.length > 100 
            ? `${movie.description.substring(0, 100)}...` 
            : movie.description}
        </Card.Text>
        <div className="mb-2">
          <Badge className="badge-custom me-2">{movie.genre}</Badge>
          <small className="text-muted">
            {movie.year} • {movie.country} • {movie.duration} min
          </small>
        </div>
        <div className="d-flex gap-2 mt-auto">
          <Button 
            variant={isFavourite ? "success" : "outline-success"}
            size="sm"
            onClick={() => onAddToFavourite(movie.id)}
            className={isFavourite ? "btn-custom-success" : ""}
          >
            {isFavourite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
            <span className="ms-1">
              {isFavourite ? 'Remove' : 'Add to Favourites'}
            </span>
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onShowDetails(movie)}
            className="btn-custom-primary"
          >
            <Eye size={16} />
            <span className="ms-1">Details</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  onAddToFavourite: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  onShowDetails: PropTypes.func.isRequired
};

export default MovieCard;