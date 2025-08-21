import React, { useContext } from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";
import { People, Clock } from "react-bootstrap-icons";

const DishesList = ({ dishes, search, darkMode }) => {
  const { addToCart } = useContext(CartContext);

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Row>
      {filteredDishes.map((dish) => (
        <Col md={6} lg={4} className="mb-3" key={dish.id}>
          <Card
            className="h-100 shadow-sm"
            style={{
              borderColor: "#9acd32",
              backgroundColor: darkMode ? "#3a3a3a" : "#fff",
              color: darkMode ? "#f1f1f1" : "#212529",
            }}
          >
            <Card.Img
              variant="top"
              src={dish.image}
              alt={dish.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{dish.name}</Card.Title>
              <Card.Text className="flex-grow-1">{dish.description}</Card.Text>

              <div className="d-flex flex-wrap gap-2 mb-3">
                {dish.servings && (
                  <Badge bg="light" text="dark">
                    <People size={14} color="#9acd32" className="me-1" />
                    {dish.servings} servings
                  </Badge>
                )}
                {dish.prep && (
                  <Badge bg="light" text="dark">
                    <Clock size={14} color="#9acd32" className="me-1" />
                    {dish.prep} mins prep
                  </Badge>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center mt-auto">
                <h5 className="mb-0" style={{ color: "#9acd32" }}>
                  ${parseFloat(dish.price).toFixed(2)}
                </h5>
                <Button
                  style={{
                    backgroundColor: "#9acd32",
                    borderColor: "#9acd32",
                    color: "white",
                  }}
                  onClick={() => addToCart(dish)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default DishesList;
