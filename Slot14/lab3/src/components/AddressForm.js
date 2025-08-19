import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddressForm = ({ data, onFieldChange }) => {
  const [touched, setTouched] = useState({
    streetName: false,
    streetNumber: false,
    city: false,
    country: false
  });

  const countries = ['Vietnam', 'Korea', 'Italy', 'Japan', 'USA', 'France', 'Germany'];

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleFocus = (field) => {
    setTouched(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Street Name"
              value={data.streetName}
              onChange={(e) => onFieldChange('address', 'streetName', e.target.value)}
              onBlur={() => handleBlur('streetName')}
              onFocus={() => handleFocus('streetName')}
              isInvalid={touched.streetName && !data.streetName.trim()}
              required
            />
            {touched.streetName && !data.streetName.trim() && (
              <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
                Please enter street name
              </div>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Street Number"
              value={data.streetNumber}
              onChange={(e) => onFieldChange('address', 'streetNumber', e.target.value)}
              onBlur={() => handleBlur('streetNumber')}
              onFocus={() => handleFocus('streetNumber')}
              isInvalid={touched.streetNumber && !data.streetNumber.trim()}
              required
            />
            {touched.streetNumber && !data.streetNumber.trim() && (
              <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
                Please enter street number
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="City"
          value={data.city}
          onChange={(e) => onFieldChange('address', 'city', e.target.value)}
          onBlur={() => handleBlur('city')}
          onFocus={() => handleFocus('city')}
          isInvalid={touched.city && !data.city.trim()}
          required
        />
        {touched.city && !data.city.trim() && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please enter city
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Select
          value={data.country}
          onChange={(e) => onFieldChange('address', 'country', e.target.value)}
          onBlur={() => handleBlur('country')}
          onFocus={() => handleFocus('country')}
          isInvalid={touched.country && !data.country}
          required
        >
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </Form.Select>
        {touched.country && !data.country && (
          <div className="text-danger mt-1" style={{ fontSize: '14px' }}>
            Please select a country
          </div>
        )}
      </Form.Group>
    </div>
  );
};

AddressForm.propTypes = {
  data: PropTypes.shape({
    streetName: PropTypes.string.isRequired,
    streetNumber: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired
};

export default AddressForm;