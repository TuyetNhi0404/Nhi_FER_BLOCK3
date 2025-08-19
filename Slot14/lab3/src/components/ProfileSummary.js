import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProfileSummary = ({ formData }) => {
  return (
    <Card>
      <Card.Header className="bg-success text-white">
        <h5 className="mb-0 text-center">Profile Summary</h5>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          {formData.about.avatarPreview && (
            <img 
              src={formData.about.avatarPreview}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          )}
          <h4>{formData.about.firstName} {formData.about.lastName}</h4>
        </div>

        <Card className="mb-3">
          <Card.Header className="bg-light">
            <strong>Personal Information</strong>
          </Card.Header>
          <Card.Body>
             <p><strong>First Name:</strong> {formData.about.firstName}</p>
             <p><strong>Last Name:</strong> {formData.about.lastName}</p>
            <p><strong>Email:</strong> {formData.about.email}</p>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header className="bg-light">
            <strong>Account Information</strong>
          </Card.Header>
          <Card.Body>
            <p><strong>Username:</strong> {formData.account.username}</p>
            <p><strong>Security Question:</strong> {formData.account.secretQuestion}</p>
            <p><strong>Answer:</strong> {formData.account.answer}</p>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header className="bg-light">
            <strong>Address Information</strong>
          </Card.Header>
          <Card.Body>
            <p><strong>Street Address:</strong> {formData.address.streetNumber} {formData.address.streetName}</p>
            <p><strong>City:</strong> {formData.address.city}</p>
            <p><strong>Country:</strong> {formData.address.country}</p>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
};

ProfileSummary.propTypes = {
  formData: PropTypes.shape({
    about: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatarPreview: PropTypes.string
    }).isRequired,
    account: PropTypes.shape({
      username: PropTypes.string.isRequired,
      secretQuestion: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    }).isRequired,
    address: PropTypes.shape({
      streetName: PropTypes.string.isRequired,
      streetNumber: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default ProfileSummary;