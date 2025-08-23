import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';
import FoodCarousel from '../components/FoodCarousel'; // 👈 Import carousel

const Products = () => {
  const { colors } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/dishes"); // URL json-server
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || 
        (filterBy === 'cheap' && parseFloat(product.price) < 10) ||
        (filterBy === 'expensive' && parseFloat(product.price) >= 10);

      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, sortBy, filterBy]);

  const pageStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    minHeight: '100vh',
    paddingTop: '2rem'
  };

  const controlsStyle = {
    backgroundColor: colors.surface,
    padding: '1.5rem',
    borderRadius: '10px',
    marginBottom: '2rem',
    border: `2px solid ${colors.secondary}`
  };

  const inputStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.secondary,
    color: colors.text
  };

  return (
    <>
     <FoodCarousel />
        <h2 className="text-center mb-4">Our Products</h2>
    <Container fluid style={{ padding: "0 100px" }}>

        <div style={controlsStyle}>
          <Row className="align-items-end">
            <Col md={4} className="mb-3">
              <Form.Label>Search Products</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="🔍 Search dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={inputStyle}
                />
              </InputGroup>
            </Col>
            
            <Col md={3} className="mb-3">
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={inputStyle}
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </Form.Select>
            </Col>
            
            <Col md={3} className="mb-3">
              <Form.Label>Filter By Price</Form.Label>
              <Form.Select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                style={inputStyle}
              >
                <option value="all">All Products</option>
                <option value="cheap">Under $10</option>
                <option value="expensive">$10 and above</option>
              </Form.Select>
            </Col>
            
            <Col md={2} className="mb-3">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSortBy('name');
                  setFilterBy('all');
                }}
                className="w-100"
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </div>

        <Row>
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (
              <Col lg={4} md={6} className="mb-4" key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <div style={controlsStyle}>
                <h4>No products found</h4>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Products;
