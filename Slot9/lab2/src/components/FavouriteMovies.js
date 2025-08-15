import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import MovieDetailsModal from './MovieDetailsModal';

const FavouriteMovies = ({ movies, favourites, onAddToFavourite }) => {
  const favouriteMovies = movies.filter(movie => favourites.includes(movie.id));
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <Container className="py-4" style={{marginTop: '76px'}}>
      <h2 className="text-success fw-bold mb-4">My Favourite Movies</h2>
      
      {favouriteMovies.length === 0 ? (
        <Alert variant="info" className="alert-custom">
          No favourites yet. Start adding movies to see them here!
        </Alert>
      ) : (
        <>
          <div className="search-results-count">
            You have {favouriteMovies.length} favourite movies
          </div>
          <Row>
            {favouriteMovies.map(movie => (
              <Col key={movie.id} xs={12} sm={6} lg={4} className="mb-4">
                <MovieCard
                  movie={movie}
                  onAddToFavourite={onAddToFavourite}
                  isFavourite={true}
                  onShowDetails={handleShowDetails}
                />
              </Col>
            ))}
          </Row>
        </>
      )}

      <MovieDetailsModal
        movie={selectedMovie}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </Container>
  );
};

FavouriteMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  favourites: PropTypes.array.isRequired,
  onAddToFavourite: PropTypes.func.isRequired
};

export default FavouriteMovies;