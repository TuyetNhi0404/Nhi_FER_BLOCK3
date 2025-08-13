

import { useState } from "react"
import { Navbar, Nav, Container, Button} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useCart } from "../context/CartContext"
import CartSidebar from "./CartSidebar"
import { ChefHat, ShoppingCart } from "lucide-react"

const Header = () => {
  const { getTotalCartItems } = useCart()
  const [showCart, setShowCart] = useState(false)

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm" style={{ backgroundColor: "#f5f5dc" }}>
        <Container>
          <Navbar.Brand href="/" className="fw-bold" style={{ color: "#8b4513" }}>
            <ChefHat size={24} color="#8b4513" className="me-2" />
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
              <Nav.Link
                style={{ color: "#654321", cursor: "pointer" }}
                onClick={() => {
                  
                  window.location.hash = "#request-form"
                  if (window.location.pathname !== "/recipes") {
                    window.location.href = "/recipes#request-form"
                  } else {
                  
                    window.dispatchEvent(new CustomEvent("openRequestForm"))
                  }
                }}
              >
                Recipe Request Form
              </Nav.Link>
            </Nav>

            <div className="d-flex gap-2">
              <Button
                variant="outline-warning"
                onClick={() => setShowCart(true)}
                style={{ borderColor: "#8b4513", color: "#8b4513" }}
              >
                <ShoppingCart size={18} color="#8b4513" className="me-1" />
                Cart (<badge variant="warning" style={{ color: "#8b4513" }}>{getTotalCartItems()}</badge>)
              </Button>
              <LinkContainer to="/recipes">
                <Button variant="warning" style={{ backgroundColor: "#8b4513", borderColor: "#8b4513", color: "#f5f5dc" }}>
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
