"use client"
import { Col, Card, Button } from "react-bootstrap"

const StudentCard = ({ student, onViewDetails, onDelete }) => {
  return (
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={student.avatar}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          
          <Card.Title className="h5">{student.name}</Card.Title>
          <Card.Text className="mb-2">
            ID: {student.id}
          </Card.Text>
          <Card.Text className="text-muted mb-2">{student.email}</Card.Text>
          <Card.Text className="mb-2">
            Age: {student.age} 
          </Card.Text>
          <div className="mt-auto d-flex gap-2">
            <Button variant="outline-primary" size="sm" onClick={() => onViewDetails(student)}>
              View Details
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(student.id)}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default StudentCard
