"use client"
import { Offcanvas, Button, ListGroup, Badge, Row, Col } from "react-bootstrap"
import { useCart } from "../context/CartContext"

const CartSidebar = ({ show, onHide }) => {
  const { cart, removeFromCart, updateCartQuantity, getTotalCartPrice } = useCart()

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {cart.length === 0 ? (
          <div className="text-center text-muted mt-5">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item key={item.id} className="px-0">
                  <Row className="align-items-start">
                    <Col>
                      <h6 className="mb-1">{item.title}</h6>
                      <small className="fw-bold" style={{ color: "#8b4513" }}>
                        ${item.price} each
                      </small>
                    </Col>
                    <Col xs="auto">
                      <div className="d-flex align-items-center mb-2">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Badge bg="light" text="dark" className="mx-2">
                          {item.quantity}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="fw-bold mb-1">${(item.price * item.quantity).toFixed(2)}</div>
                      <Button
                        size="sm"
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="border-top border-2 mt-3 pt-3" style={{ borderColor: "#8b4513" }}>
              <Row className="align-items-center mb-3">
                <Col>
                  <h5 className="mb-0">Total:</h5>
                </Col>
                <Col xs="auto">
                  <h5 className="mb-0" style={{ color: "#8b4513" }}>
                    ${getTotalCartPrice().toFixed(2)}
                  </h5>
                </Col>
              </Row>

              <Button
                variant="warning"
                size="lg"
                className="w-100"
                style={{ backgroundColor: "#8b4513", borderColor: "#8b4513", color: "#f5f5dc" }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default CartSidebar
