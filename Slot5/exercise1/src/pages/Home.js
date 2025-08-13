import { Container, Row, Col, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Home = () => {
  return (
    <div className="bg-light min-vh-100">
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h1 className="display-4 fw-bold text-dark mb-4">Welcome to Healthy Recipe Finder</h1>
            <p className="lead text-muted mb-4">
              Discover delicious, nutritious recipes that fit your lifestyle. From quick weeknight dinners to weekend
              meal prep, we've got healthy options that actually taste amazing.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <LinkContainer to="/recipes">
                <Button variant="success" size="lg" >
                  Browse Recipes
                </Button>
              </LinkContainer>
              <LinkContainer to="/about">
                <Button variant="outline-success" size="lg">
                  Learn More
                </Button>
              </LinkContainer>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4} className="text-center mb-4">
            <div className="display-1 mb-3">🥗</div>
            <h4>Healthy & Delicious</h4>
            <p className="text-muted">
              All recipes focus on whole foods and balanced nutrition without sacrificing flavor.
            </p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="display-1 mb-3">⏱️</div>
            <h4>Quick & Easy</h4>
            <p className="text-muted">
              Most recipes can be prepared in 30 minutes or less, perfect for busy schedules.
            </p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="display-1 mb-3">💰</div>
            <h4>Budget Friendly</h4>
            <p className="text-muted">
              Affordable ingredients and smart shopping tips help you eat well without breaking the bank.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
