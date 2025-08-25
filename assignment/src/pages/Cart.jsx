import { useContext } from "react";
import { Button, Table, Container, Row, Col, Card } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, incQty, decQty, removeFromCart, subtotal } = useContext(CartContext);


  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="bg-dark text-light border-success shadow-lg">
            <Card.Header className="bg-success text-light text-center py-3">
              <h2 className="mb-0 fw-bold">
                <i className="fas fa-shopping-cart me-2"></i>
                🛒 Your Shopping Cart
              </h2>
            </Card.Header>
            
            <Card.Body className="p-4">
              {!items || items.length === 0 ? (
               
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-shopping-cart text-success" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h4 className="text-light mb-3">Your cart is empty</h4>
                  <p className="text-light mb-4">
                    Add some awesome products to your cart to get started with shopping!
                  </p>
                  <Button 
                    as={Link} 
                    to="/" 
                    variant="outline-success" 
                    size="lg"
                    className="px-4"
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                
                  <div className="table-responsive">
                    <Table 
                      hover 
                      variant="dark" 
                      className="border-success align-middle"
                    >
                      <thead className="bg-success text-dark">
                        <tr>
                          <th className="fw-bold">Product</th>
                          <th className="fw-bold text-center">Price</th>
                          <th className="fw-bold text-center">Quantity</th>
                          <th className="fw-bold text-center">Total</th>
                          <th className="fw-bold text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id} className="border-success">
                            <td>
                              <div className="d-flex align-items-center">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="me-3 rounded border border-success"
                                  style={{ 
                                    height: '60px', 
                                    width: '60px',
                                    objectFit: 'cover'
                                  }} 
                                />
                                <div>
                                  <h6 className="mb-1 text-light">{item.title}</h6>
                                  <small className="text-muted">ID: {item.id}</small>
                                </div>
                              </div>
                            </td>
                            
                            <td className="text-center">
                              <span className="text-success fw-bold">
                                {item.price?.toLocaleString() || 0}₫
                              </span>
                            </td>
                            
                            <td className="text-center">
                              <div className="d-flex align-items-center justify-content-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline-secondary"
                                  onClick={() => decQty(item.id)}
                                  disabled={item.qty <= 1}
                                  className="rounded-circle"
                                  style={{ width: '32px', height: '32px' }}
                                >
                                 -
                                </Button>
                                
                                <span 
                                  className="mx-2 fw-bold text-light px-2"
                                  style={{ minWidth: '40px', textAlign: 'center' }}
                                >
                                  {item.qty || 0}
                                </span>
                                
                                <Button
                                  size="sm"
                                  variant="outline-secondary"
                                  onClick={() => incQty(item.id)}
                                  className="rounded-circle"
                                  style={{ width: '32px', height: '32px' }}
                                >
                                  +
                                </Button>
                              </div>
                            </td>
                            
                            <td className="text-center">
                              <span className="text-success fw-bold fs-6">
                                {((item.price || 0) * (item.qty || 0)).toLocaleString()}₫
                              </span>
                            </td>
                            
                            <td className="text-center">
                              <Button
                                size="sm"
                                variant="outline-warning"
                                onClick={() => removeFromCart(item.id)}
                                className="px-3"
                              >
                                
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                 
                  <div className="border-top border-success pt-4 mt-4">
                    <Row className="align-items-center">
                      <Col md={6}>
                        <div className="d-flex flex-column gap-2">
                          <div className="text-light">
                            <i className="fas fa-box me-2 text-success"></i>
                            Total Items: <span className="text-warning fw-bold">{items.length}</span>
                          </div>
                          <div className="text-light">
                            <i className="fas fa-calculator me-2 text-success"></i>
                            Total Quantity: <span className="text-warning fw-bold">
                              {items.reduce((total, item) => total + (item.qty || 0), 0)}
                            </span>
                          </div>
                        </div>
                      </Col>
                      
                      <Col md={6} className="text-md-end mt-3 mt-md-0">
                        <div className="mb-3">
                          <h4 className="text-success mb-2">
                            <i className="fas fa-money-bill-wave me-2"></i>
                            Subtotal: {(subtotal || 0).toLocaleString()}₫
                          </h4>
                          <small className="text-secondary">* Shipping not included</small>
                        </div>
                        
                        <div className="d-flex gap-2 justify-content-md-end">
                          <Button 
                            as={Link} 
                            to="/" 
                            variant="outline-secondary"
                            className="px-4"
                          >
                            <i className="fas fa-arrow-left me-2"></i>
                            Continue Shopping
                          </Button>
                          
                          <Button 
                            as={Link} 
                            to="/checkout" 
                            variant="success"
                            size="lg"
                            className="px-4 fw-bold"
                          >
                            <i className="fas fa-credit-card me-2"></i>
                            Proceed to Checkout
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}