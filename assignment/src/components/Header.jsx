import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const { count } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Navbar
  expand="lg"
  sticky="top"
  className="navbar-dark"
  style={{ backgroundColor: "#0d1b0d" }}
>
  <Container fluid className="px-0">
 
    <div style={{ marginLeft: "100px" }}>
      <Navbar.Brand
        as={Link}
        to="/"
        className="fw-bold text-success"
        style={{ fontSize: "1.4rem" }}
      >
        LSoul Shop
      </Navbar.Brand>
    </div>

    <Navbar.Toggle aria-controls="nav" />

    <Navbar.Collapse id="nav" className="justify-content-between">
 
      <Nav className="me-auto" style={{ marginLeft: "35px" }}>
        <Nav.Link as={Link} to="/" className="text-light">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/wishlist" className="text-light">
          Wishlist
        </Nav.Link>
        <Nav.Link as={Link} to="/cart" className="text-light">
          Cart{" "}
          {count > 0 && (
            <Badge bg="success" className="ms-1">
              {count}
            </Badge>
          )}
        </Nav.Link>
        <Nav.Link as={Link} to="/checkout" className="text-light">
          Checkout
        </Nav.Link>
      </Nav>

      <Nav style={{ marginRight: "100px" }}>
        {user ? (
          <NavDropdown
            title={<span className="text-success fw-bold">{user.name}</span>}
            align="end"
            menuVariant="dark"
          >
            <NavDropdown.Item as={Link} to="/wishlist">
              Wishlist
            </NavDropdown.Item>
            
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link
            as={Link}
            to={`/login?redirect_uri=${encodeURIComponent(location.pathname)}`}
            className="text-success fw-bold"
          >
            Sign in
          </Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}
