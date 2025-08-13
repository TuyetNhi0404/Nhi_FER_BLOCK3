import { Container, Row, Col, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Salad, Clock, DollarSign } from "lucide-react"

const Home = () => {
  return (
    <div style={{ backgroundColor: "#f5f5dc", minHeight: "100vh" }}>
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h1 className="display-4 fw-bold mb-4" style={{ color: "#8b4513" }}>
              Welcome to Healthy Recipe Finder
            </h1>
            <p className="lead mb-4" style={{ color: "#654321" }}>
              Discover delicious, nutritious recipes that fit your lifestyle. From quick weeknight dinners to weekend
              meal prep, we've got healthy options that actually taste amazing.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <LinkContainer to="/recipes">
                <Button size="lg" style={{ backgroundColor: "#8b4513", borderColor: "#8b4513", color: "#f5f5dc" }}>
                  Browse Recipes
                </Button>
              </LinkContainer>
              <LinkContainer to="/about">
                <Button size="lg" style={{ backgroundColor: "transparent", borderColor: "#8b4513", color: "#8b4513" }}>
                  Learn More
                </Button>
              </LinkContainer>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4} className="text-center mb-4">
            <div className="mb-3">
              <Salad size={64} color="#8b4513" />
            </div>
            <h4 style={{ color: "#8b4513" }}>Healthy & Delicious</h4>
            <p style={{ color: "#654321" }}>
              All recipes focus on whole foods and balanced nutrition without sacrificing flavor.
            </p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="mb-3">
              <Clock size={64} color="#8b4513" />
            </div>
            <h4 style={{ color: "#8b4513" }}>Quick & Easy</h4>
            <p style={{ color: "#654321" }}>
              Most recipes can be prepared in 30 minutes or less, perfect for busy schedules.
            </p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="mb-3">
              <DollarSign size={64} color="#8b4513" />
            </div>
            <h4 style={{ color: "#8b4513" }}>Budget Friendly</h4>
            <p style={{ color: "#654321" }}>
              Affordable ingredients and smart shopping tips help you eat well without breaking the bank.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
