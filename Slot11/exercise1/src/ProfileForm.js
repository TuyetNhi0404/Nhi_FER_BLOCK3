import React, { useState } from "react"
import PropTypes from "prop-types"

const ProfileForm = ({ initialData, onSubmit, showToastDuration, cardMaxWidth }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      age: "",
    }
  )

  const [showToast, setShowToast] = useState(false)
  const [errors, setErrors] = useState({})
  const [submittedData, setSubmittedData] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.age) {
      newErrors.age = "Age is required"
    } else if (parseInt(formData.age) <= 0) {
      newErrors.age = "Age must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmittedData(formData) 
      setShowToast(true)

      if (onSubmit) {
        onSubmit(formData) 
      }

      setTimeout(() => {
        setShowToast(false)
      }, showToastDuration || 5000)

      console.log("Form submitted successfully:", formData)
    }
  }

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.age &&
    parseInt(formData.age) > 0 &&
    Object.keys(errors).length === 0

  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="card shadow-lg"
          style={{ maxWidth: cardMaxWidth || "1000px", width: "100%" }}
        >
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4 fw-bold">Profile Form</h2>

            <div className="mb-3">
              <label className="form-label fw-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter your age"
                min="1"
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
              />
              {errors.age && (
                <div className="invalid-feedback">{errors.age}</div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`btn w-100 ${
                isFormValid ? "btn-success" : "btn-secondary"
              }`}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Hiển thị dữ liệu đã submit */}
        {submittedData && (
          <div
            className="card shadow mt-4"
            style={{ maxWidth: cardMaxWidth || "400px", width: "100%" }}
          >
            <div className="card-header bg-success text-white">
              <h5 className="card-title mb-0">✓ Submitted Information</h5>
            </div>
            <div className="card-body">
              <div className="mb-2">
                <strong>Name:</strong> {submittedData.name}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {submittedData.email}
              </div>
              <div className="mb-0">
                <strong>Age:</strong> {submittedData.age}
              </div>
            </div>
          </div>
        )}
      </div>

      {showToast && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
          <div className="toast show bg-success text-white" role="alert">
            <div className="toast-body d-flex align-items-center">
              <svg
                className="me-2"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              Submitted successfully!
            </div>
          </div>
        </div>
      )}
    </>
  )
}

ProfileForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onSubmit: PropTypes.func,
  showToastDuration: PropTypes.number,
  cardMaxWidth: PropTypes.string,
}

ProfileForm.defaultProps = {
  initialData: {
    name: "",
    email: "",
    age: "",
  },
  onSubmit: null,
  showToastDuration: 5000,
  cardMaxWidth: "400px",
}

export default ProfileForm
