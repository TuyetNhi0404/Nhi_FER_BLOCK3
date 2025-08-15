import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Film } from 'lucide-react';

const NavigationBar = ({ currentView, onNavigate }) => {
  return (
    <Navbar expand="lg" className="navbar-custom fixed-top">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          <Film className="me-2" size={24} />
          Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              href="#movies" 
              className={currentView === 'movies' ? 'active' : ''}
              onClick={() => onNavigate('movies')}
            >
              Free Movies
            </Nav.Link>
            <Nav.Link 
              href="#favourites" 
              className={currentView === 'favourites' ? 'active' : ''}
              onClick={() => onNavigate('favourites')}
            >
              My Favourite Movies
            </Nav.Link>
            <Nav.Link 
              href="#form" 
              className={currentView === 'form' ? 'active' : ''}
              onClick={() => onNavigate('form')}
            >
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  currentView: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default NavigationBar;