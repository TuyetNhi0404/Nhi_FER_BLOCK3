import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import PropTypes from 'prop-types';

const AccountForm = ({ data, onFieldChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
    secretQuestion: false,
    answer: false
  });

  const secretQuestions = [
    "What is your first pet's name?",
    "What is your mother's maiden name?",
    "In which city were you born?",
    "Who was your favorite teacher?"
  ];

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleFocus = (field) => {
    setTouched(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => onFieldChange('account', 'username', e.target.value)}
          onBlur={() => handleBlur('username')}
          onFocus={() => handleFocus('username')}
          isInvalid={touched.username && ((data.username && data.username.length < 6) || !data.username)}
          required
        />
        {touched.username && !data.username && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please enter a username
          </div>
        )}
        {touched.username && data.username && data.username.length < 6 && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Username must be at least 6 characters
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <div className="position-relative">
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={data.password}
            onChange={(e) => onFieldChange('account', 'password', e.target.value)}
            onBlur={() => handleBlur('password')}
            onFocus={() => handleFocus('password')}
            isInvalid={touched.password && ((data.password && !passwordRegex.test(data.password)) || !data.password)}
            required
          />
          <Button
            variant="link"
            className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent p-0 me-2"
            onClick={() => setShowPassword(!showPassword)}
            style={{ zIndex: 10 }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        </div>
        {touched.password && !data.password && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please enter a password
          </div>
        )}
        {touched.password && data.password && !passwordRegex.test(data.password) && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Password must be at least 8 characters with uppercase, lowercase, number, and special character
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <div className="position-relative">
          <Form.Control
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={(e) => onFieldChange('account', 'confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            onFocus={() => handleFocus('confirmPassword')}
            isInvalid={touched.confirmPassword && ((data.confirmPassword && data.password !== data.confirmPassword) || !data.confirmPassword)}
            required
          />
          <Button
            variant="link"
            className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent p-0 me-2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ zIndex: 10 }}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        </div>
        {touched.confirmPassword && !data.confirmPassword && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please confirm your password
          </div>
        )}
        {touched.confirmPassword && data.confirmPassword && data.password !== data.confirmPassword && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Passwords do not match
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Select
          value={data.secretQuestion}
          onChange={(e) => onFieldChange('account', 'secretQuestion', e.target.value)}
          onBlur={() => handleBlur('secretQuestion')}
          onFocus={() => handleFocus('secretQuestion')}
          isInvalid={touched.secretQuestion && !data.secretQuestion}
          required
        >
          <option value="">Select a secret question</option>
          {secretQuestions.map((question, index) => (
            <option key={index} value={question}>{question}</option>
          ))}
        </Form.Select>
        {touched.secretQuestion && !data.secretQuestion && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please select a secret question
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Answer"
          value={data.answer}
          onChange={(e) => onFieldChange('account', 'answer', e.target.value)}
          onBlur={() => handleBlur('answer')}
          onFocus={() => handleFocus('answer')}
          isInvalid={touched.answer && !data.answer.trim()}
          required
        />
        {touched.answer && !data.answer.trim() && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please enter an answer
          </div>
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
    answer: PropTypes.string.isRequired
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired
};

export default AccountForm;