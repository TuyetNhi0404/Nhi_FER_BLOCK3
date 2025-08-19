import { Container, Row, Col } from "react-bootstrap"

const Hero = () => {
  return (
    <div className="bg-success text-white py-5 mb-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="fw-bold display-4">Student Management</h1>
            <p className="lead mt-3">
              A simple and powerful system to manage student information, track progress, 
              and monitor performance efficiently.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero