import React, { useState } from "react";
import { Container, Button, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const headerStyle = {
    backgroundColor: darkMode ? "#145a32" : "#1e6f1e",
  };

  const footerStyle = {
    backgroundColor: darkMode ? "#1e1e1e" : "#f8f9fa",
    color: darkMode ? "#d0e8d0" : "#333",
    textAlign: "center",
    padding: "15px",
    marginTop: "30px",
    borderTop: "2px solid #228B22",
  };

  return (
    <CartProvider>
      <Router>
        <div
          className={
            darkMode
              ? "bg-secondary text-light min-vh-100 d-flex flex-column"
              : "bg-light min-vh-100 d-flex flex-column"
          }
        >
        
          <Navbar expand="lg" style={headerStyle} variant="dark" className="px-3">
            <Navbar.Brand as={Link} to="/">🍴 Food Ordering</Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
              <Nav.Link as={Link} to="/cart">🛒 Giỏ hàng</Nav.Link>
              <Button
                variant={darkMode ? "light" : "dark"}
                size="sm"
                className="ms-3"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </Button>
            </Nav>
          </Navbar>

         
          <Container className="py-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<DishesList darkMode={darkMode} />} />
              <Route path="/cart" element={<Cart darkMode={darkMode} />} />
            </Routes>
          </Container>

       
          <footer style={footerStyle}>
            <p className="mb-0">© {new Date().getFullYear()} Food Ordering App.</p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
