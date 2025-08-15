import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import SearchFilterBar from './SearchFilterBar';
import MovieDetailsModal from './MovieDetailsModal';

const MovieList = ({ movies, favourites, onAddToFavourite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('none');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    if (sortBy === 'duration_asc') {
      filtered.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'duration_desc') {
      filtered.sort((a, b) => b.duration - a.duration);
    }

    return filtered;
  }, [movies, searchTerm, selectedGenre, sortBy]);

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="search-results-count">
        Found {filteredAndSortedMovies.length} movies
      </div>

      {filteredAndSortedMovies.length === 0 ? (
        <Alert variant="warning" className="alert-custom">
          No movies found matching your criteria.
        </Alert>
      ) : (
        <Row>
          {filteredAndSortedMovies.map(movie => (
            <Col key={movie.id} xs={12} sm={6} lg={4} className="mb-4">
              <MovieCard
                movie={movie}
                onAddToFavourite={onAddToFavourite}
                isFavourite={favourites.includes(movie.id)}
                onShowDetails={handleShowDetails}
              />
            </Col>
          ))}
        </Row>
      )}

      <MovieDetailsModal
        movie={selectedMovie}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </Container>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  favourites: PropTypes.array.isRequired,
  onAddToFavourite: PropTypes.func.isRequired
};

export default MovieList;