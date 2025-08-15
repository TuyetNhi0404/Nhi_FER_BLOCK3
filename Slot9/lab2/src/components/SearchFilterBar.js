import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import { allGenres } from '../data/movies';

const SearchFilterBar = ({ searchTerm, onSearchChange, selectedGenre, onGenreChange, sortBy, onSortChange }) => {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <InputGroup>
          <InputGroup.Text>
            <Search size={16} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
      </Col>
      <Col md={4}>
        <Form.Select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          {allGenres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="none">Sort by Duration</option>
          <option value="duration_asc">Duration ↑</option>
          <option value="duration_desc">Duration ↓</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

SearchFilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired
};

export default SearchFilterBar;