import React, { useContext, useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

const DishesList = ({ darkMode }) => {
  const { addToCart } = useContext(CartContext);
  const [search, setSearch] = useState("");

  
  const dishes = [
    { id: 0, name: "Uthappizza", image: "/img/image1.png", price: "4.99", description: "A unique combination of Indian Uthappam and Italian pizza." },
    { id: 1, name: "Zucchipakoda", image: "/img/image2.png", price: "1.99", description: "Deep fried Zucchini with chickpea batter." },
    { id: 2, name: "Vadonut", image: "/img/image3.png", price: "1.99", description: "A combination of vada and donut." },
    { id: 3, name: "ElaiCheese Cake", image: "/img/image4.png", price: "2.99", description: "New York Style Cheesecake with Indian cardamoms." },
    { id: 4, name: "Lobster Thermidor", image: "/img/image5.png", price: "29.99", description: "Succulent lobster baked in a creamy white wine sauce, served with herbs." },
    { id: 5, name: "Wagyu Steak", image: "/img/image6.png", price: "49.99", description: "Premium Japanese Wagyu beef grilled to perfection, melt-in-your-mouth texture." },
  ];

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
   
      <Form.Control
        type="text"
        placeholder="🔍 Tìm kiếm món ăn..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
        style={{
          backgroundColor: darkMode ? "#E1EDED" : "white",
          color: "black",
          borderColor: "#228B22",
        }}
      />

      
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
    </>
  );
};

DishesList.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default DishesList;
