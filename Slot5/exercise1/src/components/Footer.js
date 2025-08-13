import { Container, Row, Col } from "react-bootstrap"

function Footer() {
  return (
    <footer className="text-light py-4 mt-5" style={{ backgroundColor: "#8b4513" }}>
      <Container className="text-center">
        <Row>
          <Col md={6} className="text-center">
            <h5 style={{ color: "#f5f5dc" }}>Recipe App</h5>
            <p className="mb-0"  style={{ color: "#deb887" }}>Made by NB Group.</p>
          </Col>

          <Col md={6} className="text-center">
            <h5 style={{ color: "#f5f5dc" }}>Contact</h5>
            <p className="mb-1" style={{ color: "#deb887" }}>Email: info@recipeapp.com</p>
            <p className="mb-0" style={{ color: "#deb887" }}>Phone: (84) 123-456-789</p>
          </Col>
        </Row>
        
      </Container>
    </footer>
  )
}

export default Footer
