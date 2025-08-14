import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import NameList from "./components/NameList";
import UserProfile from "./components/UserProfile";
import Welcome from "./components/Welcome";
import StudentCard from "./components/StudentCard";

function App() {

  const userData = { 
    name: "traltb@fe.edu.vn", 
    age: 39, 
    avatar: "/img/image1.png" 
  };
  
 
  const teamMembers = [
    { 
      name: "traltb@fe.edu.vn", 
      avatar: "/img/image1.png",
      role: "Administrator"
    },
    { 
      name: "Nhi@fe.edu.vn", 
      avatar: "/img/image2.png",
      role: "Manager"
    }
  ];
  
 
  const students = [
    { name: "Le Thi Bich Tra", age: 20, avatar: "/img/image1.png" },
    { name: "Bui Nhi", age: 21, avatar: "/img/image2.png" },
    { name: "Nguye Thi A", age: 19, avatar: "/img/image3.png" }
  ];

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
    
      <div 
        className="py-5 mb-4"
        style={{ 
          background: 'linear-gradient(135deg, #DEB887 0%, #CD853F 100%)',
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.15)'
        }}
      >
        <Container>
          <h1 className="text-center text-white mb-2" style={{ fontWeight: '700', fontSize: '2.5rem' }}>
            <i className="fas fa-graduation-cap me-3"></i>
            Student Management System
          </h1>
        </Container>
      </div>

      <Container className="pb-5">
        <Welcome 
          name="traltb@fe.edu.vn" 
          avatar="/img/image1.png"
        />
        
   
        <UserProfile user={userData} />
        
      
        <NameList names={teamMembers} />
        
      
        <div 
          className="p-4 rounded-4 mb-4"
          style={{ 
            background: 'linear-gradient(135deg, #FAEBD7 0%, #F5DEB3 100%)',
            border: '2px solid #DEB887',
            boxShadow: '0 8px 30px rgba(139, 69, 19, 0.1)'
          }}
        >
          <h3 
            className="text-center mb-4 py-3" 
            style={{ 
              color: '#8B4513', 
              fontWeight: '700',
              fontSize: '2rem'
            }}
          >
            <i className="fas fa-users me-3"></i>
            Students  Information
          </h3>
          
          <Row className="g-4">
            {students.map((student, index) => (
              <Col key={index} sm={12} md={6} lg={4}>
                <StudentCard student={student} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      
    
      <footer 
        className="mt-5 py-4"
        style={{ 
          backgroundColor: '#8B4513',
          color: 'white'
        }}
      >
        <Container>
          <Row>
            <Col md={6}>
              <h6>
                <i className="fas fa-graduation-cap me-2"></i>
                Student Management System
              </h6>
   
            </Col>
            <Col md={6} className="text-md-end">
              <p className="mb-0">© 2024 - Made with Nhi</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;