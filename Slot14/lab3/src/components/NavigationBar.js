import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"

const NavigationBar = ({ onShowProfileBuilder }) => {
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          🎓 Student Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#students">Students</Nav.Link>
            <Nav.Link href="#student-register">Student Register</Nav.Link>
            <Nav.Link 
              onClick={onShowProfileBuilder} 
              style={{ cursor: 'pointer' }}
            >
              Build your Profile
            </Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar