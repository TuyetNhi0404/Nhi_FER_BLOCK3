

import { useState } from "react"
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap"
import { useCart } from "../context/CartContext"

const RecipeModal = ({ show, onHide, recipe }) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (recipe) {
      addToCart(recipe, quantity)
      setQuantity(1)
      onHide()
    }
  }

  if (!recipe) return null

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          fluid
          rounded
          className="mb-3"
          style={{ height: "200px", width: "100%", objectFit: "cover" }}
        />

        <p className="text-muted">{recipe.description}</p>

        <Row className="mb-3">
          <Col sm={6}>
            <strong style={{ color: "#8b4513" }}>Servings:</strong> {recipe.servings}
          </Col>
          <Col sm={6}>
            <strong style={{ color: "#8b4513" }}>Prep Time:</strong> {recipe.prep} mins
          </Col>
          {recipe.cook > 0 && (
            <Col sm={6}>
              <strong style={{ color: "#8b4513" }}>Cook Time:</strong> {recipe.cook} mins
            </Col>
          )}
        </Row>

        <hr />

        <Row className="align-items-end">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>
                <strong>Quantity:</strong>
              </Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col sm={6} className="text-end">
            <h4 className="mb-0" style={{ color: "#8b4513" }}>${(recipe.price * quantity).toFixed(2)}</h4>
            <small className="text-muted">
              ${recipe.price} × {quantity}
            </small>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button onClick={handleAddToCart} style={{ backgroundColor: "#8b4513", borderColor: "#8b4513" }}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RecipeModal
