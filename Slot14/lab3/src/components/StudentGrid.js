"use client"
import { Row } from "react-bootstrap"
import StudentCard from "./StudentCard"

const StudentGrid = ({ students, onViewDetails, onDelete }) => {
  return (
    <Row className="g-4">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} onViewDetails={onViewDetails} onDelete={onDelete} />
      ))}
    </Row>
  )
}

export default StudentGrid
