import React from 'react';
import { Card, Button } from 'react-bootstrap';

const UserProfile = ({ user }) => (
  <Card 
    className="mb-4 shadow-sm" 
    style={{ 
      backgroundColor: '#FAEBD7', 
      border: '1px solid #D2B48C' 
    }}
  >
    <Card.Header 
      className="border-0" 
      style={{ 
        background: 'linear-gradient(135deg, #DEB887, #D2B48C)', 
        color: '#8B4513' 
      }}
    >
      <h5 className="mb-0 fw-bold">
        Personal Information
      </h5>
    </Card.Header>
    <Card.Body className="py-4">
      <div className="d-flex align-items-center">
        <div className="me-4">
          <div 
            className="rounded-circle overflow-hidden"
            style={{ 
              width: '70px', 
              height: '70px',
              border: '3px solid #CD853F',
              boxShadow: '0 4px 12px rgba(139, 69, 19, 0.2)'
            }}
          >
            <img 
              src={user.avatar || "/img/image1.png"}
              alt={`${user.name}'s avatar`}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
            />
        
          </div>
        </div>
        <div>
          <h6 className="mb-2" style={{ color: '#8B4513', fontSize: '18px', fontWeight: '600' }}>
            {user.name}
          </h6>
          <Button 
            variant='warning'
            className="px-3 py-2" 
            style={{ 
              color: '#f5f5f5',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {user.age} years old
          </Button>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default UserProfile;