import React, { useState, useMemo } from "react"
import { ToastContainer, Toast } from "react-bootstrap"
import NavigationBar from "./components/NavigationBar"
import Hero from "./components/Hero"
import Filters from "./components/Filters"
import StudentGrid from "./components/StudentGrid"
import StudentDetailModal from "./components/StudentDetailModal"
import Footer from "./components/Footer"
import ProfileBuilderModal from "./components/ProfileBuilderModal"
import { studentsData } from "./data/students"
import "bootstrap/dist/css/bootstrap.min.css"

export default function App() {
  // Existing student management state
  const [students, setStudents] = useState(studentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [ageRange, setAgeRange] = useState("")
  const [hasAvatar, setHasAvatar] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Profile Builder state
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Existing student filtering logic
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())

      let matchesAge = true
      if (ageRange === "lte20") matchesAge = student.age <= 20
      else if (ageRange === "21-25") matchesAge = student.age >= 21 && student.age <= 25
      else if (ageRange === "gt25") matchesAge = student.age > 25

      const matchesAvatar = !hasAvatar || (student.avatar && student.avatar.trim() !== "")

      return matchesSearch && matchesAge && matchesAvatar
    })

    // Sorting
    if (sortBy === "age-asc") {
      filtered.sort((a, b) => a.age - b.age)
    } else if (sortBy === "age-desc") {
      filtered.sort((a, b) => b.age - a.age)
    } else if (sortBy === "name-az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "name-za") {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    }

    return filtered
  }, [students, searchTerm, sortBy, ageRange, hasAvatar])
 
  // Event handlers
  const handleViewDetails = (student) => {
    setSelectedStudent(student)
    setShowModal(true)
  }

  const handleDelete = (studentId) => {
    setStudents(students.filter((student) => student.id !== studentId))
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedStudent(null)
  }

  const handleShowProfileBuilder = () => {
    setShowProfileModal(true)
  }

  const handleProfileSubmitSuccess = () => {
    setShowToast(true)
  }

  return (
    <div className="min-h-screen bg-light">
      <NavigationBar onShowProfileBuilder={handleShowProfileBuilder} />
      <Hero />

      <div className="container py-5">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          ageRange={ageRange}
          setAgeRange={setAgeRange}
          hasAvatar={hasAvatar}
          setHasAvatar={setHasAvatar}
        />

        <StudentGrid
          students={filteredAndSortedStudents}
          onViewDetails={handleViewDetails}
          onDelete={handleDelete}
        />
      </div>

      <Footer />

      <StudentDetailModal 
        student={selectedStudent} 
        show={showModal} 
        onHide={handleCloseModal} 
      />

      <ProfileBuilderModal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        onSubmitSuccess={handleProfileSubmitSuccess}
      />

   
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={10000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto text-success">Success!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}