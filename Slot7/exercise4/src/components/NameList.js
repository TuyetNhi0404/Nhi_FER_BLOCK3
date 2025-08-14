import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const NameList = ({ names }) => (
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
        <i className="fas fa-users me-2"></i>
        Team Members
      </h5>
    </Card.Header>
    <Card.Body className="py-4">
      <Row>
        {names.map((member, index) => (
          <Col key={index} md={6} className="mb-3">
            <div 
              className="p-3 rounded-3 d-flex align-items-center h-100"
              style={{ 
                backgroundColor: '#F5DEB3',
                border: '1px solid #DEB887',
                borderLeft: '4px solid #CD853F',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <div 
                className="me-3 rounded-circle overflow-hidden flex-shrink-0"
                style={{ 
                  width: '50px', 
                  height: '50px',
                  border: '2px solid #CD853F'
                }}
              >
                <img 
                  src={member.avatar}
                  alt={`${member.name}'s avatar`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                
                />

              </div>
              <div>
                <div style={{ color: '#8B4513', fontSize: '16px', fontWeight: '600' }}>
                  {member.name}
                </div>
                <small className="text-muted">
                  {member.role || (index === 0 ? 'Administrator' : 'Member')}
                </small>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Card.Body>
  </Card>
);

export default NameList;