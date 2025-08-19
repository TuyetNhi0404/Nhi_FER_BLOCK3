import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

// Hàm xác thực đầu vào
const validateInput = (value) => {
  return value.length >= 5;
};

function ValidatedInput() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput);
    if (!isValidInput && value !== "") {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!");
    } else {
      setErrorMessage("");
    }
  }, [value]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow-lg p-4 rounded-3">
            <Card.Body>
              <h4 className="mb-4 text-center">Nhập Thông Tin</h4>
              <Form>
                <Form.Group controlId="validatedInput" className="mb-3">
                  <Form.Label>Nhập một giá trị</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập ít nhất 5 ký tự..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    isValid={isValid && value !== ""}
                    isInvalid={!isValid && value !== ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorMessage}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">
                    Giá trị hợp lệ!
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit" disabled={!isValid || value === ""}>
                    Gửi
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ValidatedInput;
