import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "bootstrap/dist/css/bootstrap.min.css";

const dishes = [
  { id: 0, name: "Uthappizza", image: "/img/image1.png", price: "4.99", description: "A unique combination of Indian Uthappam and Italian pizza." },
  { id: 1, name: "Zucchipakoda", image: "/img/image2.png", price: "1.99", description: "Deep fried Zucchini with chickpea batter." },
  { id: 2, name: "Vadonut", image: "/img/image3.png", price: "1.99", description: "A combination of vada and donut." },
  { id: 3, name: "ElaiCheese Cake", image: "/img/image4.png", price: "2.99", description: "New York Style Cheesecake with Indian cardamoms." },
   {
    id: 4,
    name: "Lobster Thermidor",
    image: "/img/image5.png",
    price: "29.99",
    description: "Succulent lobster baked in a creamy white wine sauce, served with herbs.",
  },
  {
    id: 5,
    name: "Wagyu Steak",
    image: "/img/image6.png",
    price: "49.99",
    description: "Premium Japanese Wagyu beef grilled to perfection, melt-in-your-mouth texture.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const headerStyle = {
    backgroundColor: darkMode ? "#145a32" : "#1e6f1e", 
    color: "white",
    padding: "15px 30px",
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
      <div
        className={
          darkMode
            ? "bg-secondary text-light min-vh-100 d-flex flex-column"
            : "bg-light min-vh-100 d-flex flex-column"
        }
      >
       
        <div style={headerStyle} className="w-100 d-flex justify-content-between align-items-center">
          <h2 className="mb-0">🍴 Food Ordering</h2>
          <Button
            variant={darkMode ? "light" : "dark"}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Button>
        </div>

     
        <Container className="py-4 flex-grow-1">
       
          <Form.Control
            type="text"
            placeholder="🔍 Tìm kiếm món ăn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
            style={{
              backgroundColor: darkMode ? "#E1EDED" : "white",
              color: darkMode ?"black" : "black",
              borderColor: "#228B22",
            }}
          />

     
          <DishesList dishes={dishes} search={search} darkMode={darkMode} />
          <Cart darkMode={darkMode} />
        </Container>

      
        <footer style={footerStyle}>
          <p className="mb-0">
            © {new Date().getFullYear()} Food Ordering App. 
           
          </p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
