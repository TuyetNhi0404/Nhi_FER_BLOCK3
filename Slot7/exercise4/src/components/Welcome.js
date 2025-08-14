import React from 'react';
import { Card } from 'react-bootstrap';

const Welcome = ({ name, avatar }) => {
  return (
    <Card 
      className="mb-4 shadow-sm border-0" 
      style={{ 
        background: 'linear-gradient(135deg, #F5F1EB 0%, #FAEBD7 100%)',
        borderLeft: '5px solid #CD853F'
      }}
    >
      <Card.Body className="text-center py-4">
        <div 
          className="rounded-circle mx-auto mb-3 overflow-hidden"
          style={{ 
            width: '70px', 
            height: '70px',
            border: '3px solid #CD853F',
            boxShadow: '0 4px 12px rgba(139, 69, 19, 0.2)'
          }}
        >
          <img 
            src={avatar || "/img/image1.png"}
            alt={`${name}'s avatar`}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
  
          />
          <div 
            className="d-none align-items-center justify-content-center"
            style={{ 
              width: '100%', 
              height: '100%',
              background: 'linear-gradient(135deg, #CD853F, #A0522D)',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
          </div>
        </div>
        <h2 className="mb-2" style={{ color: '#8B4513', fontWeight: '600' }}>
          Hello, {name}!
        </h2>
      </Card.Body>
    </Card>
  );
};

export default Welcome;