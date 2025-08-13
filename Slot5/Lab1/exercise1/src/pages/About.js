import { Container, Row, Col, Card } from "react-bootstrap"

const About = () => {
  return (
    <div style={{ backgroundColor: "#f5f5dc", minHeight: "100vh" }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h1 className="display-4 fw-bold text-center mb-5" style={{ color: "#8b4513" }}>
              About Us
            </h1>

            <Card className="shadow-sm mb-4" style={{ backgroundColor: "#faf8f3", border: "1px solid #d4c4a8" }}>
              <Card.Body className="p-4">
                <h3 className="mb-3" style={{ color: "#8b4513" }}>
                  Our Mission
                </h3>
                <p className="lead" style={{ color: "#654321" }}>
                  We believe that healthy eating should be simple, delicious, and accessible to everyone. Our mission is
                  to provide you with nutritious recipes that fit real-life schedules and budgets.
                </p>
              </Card.Body>
            </Card>

            <Card className="shadow-sm" style={{ backgroundColor: "#faf8f3", border: "1px solid #d4c4a8" }}>
              <Card.Body className="p-4">
                <h3 className="mb-3" style={{ color: "#8b4513" }}>
                  Our Story
                </h3>
                <p style={{ color: "#654321" }}>
                  Started by a team of home cooks and nutrition enthusiasts, Healthy Recipe Finder was born from the
                  frustration of finding truly practical healthy recipes. We were tired of complicated ingredient lists,
                  unrealistic prep times, and recipes that looked great but didn't deliver on taste.
                </p>
                <p className="mb-0" style={{ color: "#654321" }}>
                  Today, we're proud to offer a curated collection of recipes that actually work for busy people who
                  want to eat well. Every recipe in our collection has been tested, refined, and approved by real
                  families.
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
