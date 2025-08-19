import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { User } from 'lucide-react';
import PropTypes from 'prop-types';

const AboutForm = ({ data, onFieldChange, onFileChange }) => {
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleFocus = (field) => {
    setTouched(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div>
      <div className="text-center mb-4">
        <div 
          className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3"
          style={{
            width: '120px',
            height: '120px',
            cursor: 'pointer',
            border: '2px dashed #dee2e6'
          }}
          onClick={() => document.getElementById('avatar-upload').click()}
        >
          {data.avatarPreview ? (
            <img 
              src={data.avatarPreview}
              alt="Avatar"
              className="rounded-circle"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className="text-center text-muted">
              <User size={40} className="mb-2" />
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>CHOOSE PICTURE</div>
            </div>
          )}
        </div>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="First Name"
          value={data.firstName}
          onChange={(e) => onFieldChange('about', 'firstName', e.target.value)}
          onBlur={() => handleBlur('firstName')}
          onFocus={() => handleFocus('firstName')}
          isInvalid={touched.firstName && !data.firstName.trim()}
          required
        />
        {touched.firstName && !data.firstName.trim() && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please enter your first name
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={data.lastName}
          onChange={(e) => onFieldChange('about', 'lastName', e.target.value)}
          onBlur={() => handleBlur('lastName')}
          onFocus={() => handleFocus('lastName')}
          isInvalid={touched.lastName && !data.lastName.trim()}
          required
        />
        {touched.lastName && !data.lastName.trim() && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please enter your last name
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => onFieldChange('about', 'email', e.target.value)}
          onBlur={() => handleBlur('email')}
          onFocus={() => handleFocus('email')}
          isInvalid={touched.email && (!data.email || !emailRegex.test(data.email))}
          required
        />
        {touched.email && !data.email && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please enter your email
          </div>
        )}
        {touched.email && data.email && !emailRegex.test(data.email) && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please enter a valid email address
          </div>
        )}
      </Form.Group>
    </div>
  );
};

AboutForm.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarPreview: PropTypes.string.isRequired
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired
};

export default AboutForm;