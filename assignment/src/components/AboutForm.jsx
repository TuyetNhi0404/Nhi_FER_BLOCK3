import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { User } from "lucide-react";
import PropTypes from "prop-types";

const AboutForm = ({ data, onFieldChange, onFileChange }) => {
  const [touched, setTouched] = useState({ fullname: false, email: false });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleBlur = (field) =>
    setTouched((prev) => ({ ...prev, [field]: true }));
  const handleFocus = (field) =>
    setTouched((prev) => ({ ...prev, [field]: false }));

  return (
    <div>
      <div className="text-center mb-4">
        <div
          className="d-inline-flex align-items-center justify-content-center bg-dark rounded-circle mb-3"
          style={{
            width: "120px",
            height: "120px",
            cursor: "pointer",
            border: "2px dashed #28a745",
          }}
          onClick={() => document.getElementById("avatar-upload").click()}
        >
          {data.avatarPreview ? (
            <img
              src={data.avatarPreview}
              alt="Avatar"
              className="rounded-circle"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="text-center text-secondary">
              <User size={40} className="mb-2" />
              <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                CHOOSE PICTURE
              </div>
            </div>
          )}
        </div>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
      </div>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Full Name"
          value={data.fullname}
          onChange={(e) => onFieldChange("about", "fullname", e.target.value)}
          onBlur={() => handleBlur("fullname")}
          onFocus={() => handleFocus("fullname")}
          isInvalid={touched.fullname && !data.fullname.trim()}
          required
        />
        {touched.fullname && !data.fullname.trim() && (
          <div className="text-danger mt-1">Please enter your full name</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => onFieldChange("about", "email", e.target.value)}
          onBlur={() => handleBlur("email")}
          onFocus={() => handleFocus("email")}
          isInvalid={touched.email && !emailRegex.test(data.email)}
          required
        />
        {touched.email && !data.email && (
          <div className="text-danger mt-1">Please enter your email</div>
        )}
        {touched.email && data.email && !emailRegex.test(data.email) && (
          <div className="text-danger mt-1">
            Please enter a valid email address
          </div>
        )}
      </Form.Group>
    </div>
  );
};

AboutForm.propTypes = {
  data: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarPreview: PropTypes.string,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default AboutForm;
