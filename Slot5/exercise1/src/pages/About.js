import { Container, Row, Col, Card } from "react-bootstrap"

const About = () => {
  return (
    <div className="bg-light min-vh-100">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h1 className="display-4 fw-bold text-center mb-5">About Us</h1>

            <Card className="shadow-sm mb-4">
              <Card.Body className="p-4">
                <h3 className="text-success mb-3">Our Mission</h3>
                <p className="lead">
                  We believe that healthy eating should be simple, delicious, and accessible to everyone. Our mission is
                  to provide you with nutritious recipes that fit real-life schedules and budgets.
                </p>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About
