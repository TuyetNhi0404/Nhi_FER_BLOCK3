import React from 'react';
import { Navbar, Nav, NavDropdown, Badge, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';

const NavBar = () => {
  const { darkMode, toggleTheme, colors } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { getTotalFavourites } = useFavourites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navbarStyle = {
    backgroundColor: colors.primary,
    borderBottom: `2px solid ${colors.secondary}`
  };

  return (
    <Navbar expand="lg" variant="dark" style={navbarStyle} className="px-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🍴 Food Ordering
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative me-2">
              🛒 Cart
              {getTotalItems() > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {getTotalItems()}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link as={Link} to="/favourites" className="position-relative me-3">
              ❤️ Favourites
              {getTotalFavourites() > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {getTotalFavourites()}
                </Badge>
              )}
            </Nav.Link>

            {isLoggedIn ? (
              <NavDropdown title={`👤 ${user?.name || 'User'}`} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/favourites">My Favourites</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">👤 Login</Nav.Link>
            )}

            <Button
              variant={darkMode ? "light" : "dark"}
              size="sm"
              className="ms-3"
              onClick={toggleTheme}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
