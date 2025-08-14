import React from "react";
import { Card, Button } from "react-bootstrap";

const StudentCard = ({ student }) => {
  return (
    <Card 
      className="h-100 shadow border-0"
      style={{ 
        backgroundColor: '#FEFCF8',
        border: '1px solid #DEB887',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
        <Card.Img
          variant="top"
          src={student.avatar}
          alt={`${student.name}'s avatar`}
          style={{ 
            height: '200px', 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
        />
      </div>
      
      <Card.Body className="p-4" style={{ backgroundColor: '#FAEBD7' }}>
        <Card.Title 
          className="mb-3 text-center" 
          style={{ 
            color: '#8B4513', 
            fontSize: '18px', 
            fontWeight: '600' 
          }}
        >
          {student.name}
        </Card.Title>
        
        <div className="text-center mb-4">
          <Button
            variant="warning"
            style={{ 
              color: '#f5f5f5',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
         
            {student.age} years old
          </Button>
        </div>
        
        <div className="d-grid">
          <Button 
            variant="outline-primary" 
            size="lg"
            className="fw-bold"
            style={{ 
              borderColor: '#CD853F', 
              color: '#CD853F',
              borderWidth: '2px',
              transition: 'all 0.3s ease'
            }}
          >
            Edit Profile
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
