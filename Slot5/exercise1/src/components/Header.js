"use client"

import { useState } from "react"
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useCart } from "../context/CartContext"
import CartSidebar from "./CartSidebar"

const Header = () => {
  const { getTotalCartItems } = useCart()
  const [showCart, setShowCart] = useState(false)

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm" style={{ backgroundColor: "#f5f5dc" }}>
        <Container>
          <Navbar.Brand href="/recipes" className="fw-bold" style={{ color: "#8b4513" }}>
            <span className="me-2">🥗</span>
            Healthy Recipe Finder
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/home">
                <Nav.Link style={{ color: "#654321" }}>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link style={{ color: "#654321" }}>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/recipes">
                <Nav.Link style={{ color: "#654321" }}>Recipes</Nav.Link>
              </LinkContainer>
            </Nav>

            <div className="d-flex gap-2">
              <Button
                variant="outline-warning"
                onClick={() => setShowCart(true)}
                style={{ borderColor: "#8b4513", color: "#8b4513" }}
              >
                🛒 Cart <Badge style={{ backgroundColor: "#8b4513" }}>{getTotalCartItems()}</Badge>
              </Button>
              <LinkContainer to="/recipes">
                <Button variant="success" style={{ backgroundColor: "#f5f5dc", borderColor: "#8b4513", color: "#8b4513", borderRadius: "18px", minWidth: "200px" }}>
                  Browse Recipes
                </Button>
              </LinkContainer>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CartSidebar show={showCart} onHide={() => setShowCart(false)} />
    </>
  )
}

export default Header
