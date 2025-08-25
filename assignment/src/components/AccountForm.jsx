import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";

const AccountForm = ({ data, onFieldChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
    secretQuestion: false,
    answer: false,
  });

  const secretQuestions = [
    "What is your pet's name?",
    "What is your favorite color?",
    "In what city were you born?",
  ];

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleBlur = (field) =>
    setTouched((prev) => ({ ...prev, [field]: true }));
  const handleFocus = (field) =>
    setTouched((prev) => ({ ...prev, [field]: false }));

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => onFieldChange("account", "username", e.target.value)}
          onBlur={() => handleBlur("username")}
          onFocus={() => handleFocus("username")}
          isInvalid={touched.username && data.username.length < 6}
          required
        />
        {touched.username && data.username.length < 6 && (
          <div className="text-danger mt-1">
            Username must be at least 6 characters
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3 position-relative">
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={data.password}
          onChange={(e) => onFieldChange("account", "password", e.target.value)}
          onBlur={() => handleBlur("password")}
          onFocus={() => handleFocus("password")}
          isInvalid={touched.password && !passwordRegex.test(data.password)}
          required
        />
        <Button
          variant="link"
          className="position-absolute end-0 top-50 translate-middle-y text-success"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </Button>
        {touched.password && !passwordRegex.test(data.password) && (
          <div className="text-danger mt-1">
            Password must be ≥8 chars, include upper, lower, number, special
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3 position-relative">
        <Form.Control
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={(e) =>
            onFieldChange("account", "confirmPassword", e.target.value)
          }
          onBlur={() => handleBlur("confirmPassword")}
          onFocus={() => handleFocus("confirmPassword")}
          isInvalid={touched.confirmPassword && data.password !== data.confirmPassword}
          required
        />
        <Button
          variant="link"
          className="position-absolute end-0 top-50 translate-middle-y text-success"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? <EyeOff /> : <Eye />}
        </Button>
        {touched.confirmPassword && data.password !== data.confirmPassword && (
          <div className="text-danger mt-1">Passwords do not match</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Select
          value={data.secretQuestion}
          onChange={(e) =>
            onFieldChange("account", "secretQuestion", e.target.value)
          }
          onBlur={() => handleBlur("secretQuestion")}
          onFocus={() => handleFocus("secretQuestion")}
          isInvalid={touched.secretQuestion && !data.secretQuestion}
          required
        >
          <option value="">Select a secret question</option>
          {secretQuestions.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </Form.Select>
        {touched.secretQuestion && !data.secretQuestion && (
          <div className="text-danger mt-1">
            Please select a secret question
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Answer"
          value={data.answer}
          onChange={(e) => onFieldChange("account", "answer", e.target.value)}
          onBlur={() => handleBlur("answer")}
          onFocus={() => handleFocus("answer")}
          isInvalid={touched.answer && !data.answer.trim()}
          required
        />
        {touched.answer && !data.answer.trim() && (
          <div className="text-danger mt-1">Please enter an answer</div>
        )}
      </Form.Group>
    </div>
  );
};

AccountForm.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    secretQuestion: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default AccountForm;
