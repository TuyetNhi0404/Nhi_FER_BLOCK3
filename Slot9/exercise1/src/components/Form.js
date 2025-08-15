import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Alert, Row, Col, Card } from "react-bootstrap";

const initialState = {
  name: "",
  age: "",
  email: "",
  phone: "",
  agreeTerms: false,
  isSubmitted: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_CHECKBOX":
      return { ...state, [action.field]: action.checked };
    case "SUBMIT":
      return { ...state, isSubmitted: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};


const AdvancedForm = ({ title, onSubmit, submitButtonText }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      dispatch({ type: "SET_CHECKBOX", field: name, checked });
    } else {
      dispatch({ type: "SET_FIELD", field: name, value });
    }
  };

  
  const handleValidation = () => {
    const newErrors = {};

    if (!state.name.trim()) {
      newErrors.name = "Tên không được để trống!";
    } else if (state.name.trim().length < 3 || state.name.trim().length > 50) {
      newErrors.name = "Tên phải chứa từ 3-50 ký tự!";
    }

    if (!state.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else {
      const ageNum = parseInt(state.age, 10);
      if (isNaN(ageNum)) {
        newErrors.age = "Tuổi phải là số!";
      } else if (ageNum < 18 || ageNum > 100) {
        newErrors.age = "Tuổi phải từ 18 đến 100!";
      }
    }

    if (!state.email.trim()) {
      newErrors.email = "Email không được để trống!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(state.email)) {
        newErrors.email = "Email không đúng định dạng!";
      }
    }

  
    if (!state.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else {
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(state.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Số điện thoại phải có từ 10-15 chữ số!";
      }
    }


    if (!state.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setAlertType("danger");
      setAlertMessage("Vui lòng kiểm tra các trường hợp lỗi!");
      setShowAlert(true);
      return false;
    } else {
      setShowAlert(false);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch({ type: "SUBMIT" });
      onSubmit(state);
      
     
      setAlertType("success");
      setAlertMessage("Đã gửi thông tin thành công!");
      setShowAlert(true);
      
      
      setTimeout(() => {
        dispatch({ type: "RESET" });
        setShowAlert(false);
        setErrors({});
      }, 5000);
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setErrors({});
    setShowAlert(false);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header className="bg-primary text-white text-center">
              <h3>{title}</h3>
            </Card.Header>
            <Card.Body>
             
              {showAlert && (
                <Alert variant={alertType} className="mb-3">
                  <strong>{alertType === "danger" ? "Lỗi:" : "Thành công:"}</strong> {alertMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
               
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Họ và Tên <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    placeholder="Nhập họ và tên (3-50 ký tự)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

               
                <Form.Group className="mb-3" controlId="formAge">
                  <Form.Label>Tuổi <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={state.age}
                    onChange={handleChange}
                    isInvalid={!!errors.age}
                    placeholder="Nhập tuổi (18-100)"
                    min="18"
                    max="100"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.age}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập địa chỉ email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={state.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                    placeholder="Nhập số điện thoại (10-15 chữ số)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formAgreeTerms">
                  <Form.Check
                    type="checkbox"
                    name="agreeTerms"
                    checked={state.agreeTerms}
                    onChange={handleChange}
                    isInvalid={!!errors.agreeTerms}
                    label={
                      <>
                        Tôi đồng ý với <a href="#" className="text-primary">điều khoản và điều kiện</a> <span className="text-danger">*</span>
                      </>
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.agreeTerms}
                  </Form.Control.Feedback>
                </Form.Group>

               
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button 
                    variant="outline-secondary" 
                    type="button"
                    onClick={handleReset}
                    className="me-md-2"
                  >
                    Đặt lại
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                  >
                    {submitButtonText}
                  </Button>
                </div>
              </Form>

          
              {state.isSubmitted && Object.keys(errors).length === 0 && (
                <Alert variant="info" className="mt-4">
                  <Alert.Heading>Thông tin đã gửi:</Alert.Heading>
                  <hr />
                  <Row>
                    <Col sm={4}><strong>Tên:</strong></Col>
                    <Col sm={8}>{state.name}</Col>
                  </Row>
                  <Row>
                    <Col sm={4}><strong>Tuổi:</strong></Col>
                    <Col sm={8}>{state.age}</Col>
                  </Row>
                  <Row>
                    <Col sm={4}><strong>Email:</strong></Col>
                    <Col sm={8}>{state.email}</Col>
                  </Row>
                  <Row>
                    <Col sm={4}><strong>Số điện thoại:</strong></Col>
                    <Col sm={8}>{state.phone}</Col>
                  </Row>
                  <Row>
                    <Col sm={4}><strong>Đồng ý điều khoản:</strong></Col>
                    <Col sm={8}>
                      <span className="text-success">✓ Đã đồng ý</span>
                    </Col>
                  </Row>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


AdvancedForm.propTypes = {
  title: PropTypes.string.isRequired, // Tiêu đề phải là chuỗi
  onSubmit: PropTypes.func.isRequired, // Hàm xử lý submit phải là function
  submitButtonText: PropTypes.string, // Text nút submit (không bắt buộc)
};

// Default props
AdvancedForm.defaultProps = {
  submitButtonText: "Đăng Ký",
};
export default AdvancedForm;