"use client"
import { Modal, Button, Row, Col } from "react-bootstrap"

const StudentDetailModal = ({ student, show, onHide }) => {
  if (!student) return null

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4} className="text-center mb-3">
            <img
              src={student.avatar || `/placeholder.svg?height=200&width=200&query=student portrait ${student.name}`}
              alt={student.name}
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </Col>
          <Col md={8}>
            <h4>{student.name}</h4>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
            <p>
              <strong>Age:</strong> {student.age}
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default StudentDetailModal
