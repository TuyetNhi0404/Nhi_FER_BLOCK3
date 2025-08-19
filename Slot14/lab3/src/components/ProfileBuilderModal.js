import React, { useState, useReducer, useMemo, useCallback } from "react";
import { Modal, ProgressBar, Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import ProfileSummary from "./ProfileSummary";

// Reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.step]: {
          ...state[action.step],
          [action.field]: action.value,
        },
      };
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
};

const initialFormState = {
  about: {
    firstName: "",
    lastName: "",
    email: "",
    avatar: null,
    avatarPreview: "",
  },
  account: {
    username: "",
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    answer: "",
  },
  address: {
    streetName: "",
    streetNumber: "",
    city: "",
    country: "",
  },
};

const ProfileBuilderModal = ({ show, onHide, onSubmitSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, dispatch] = useReducer(formReducer, initialFormState);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const steps = ["About", "Account", "Address"];

  // Enhanced Validation
  const isAboutValid = useMemo(() => {
    const { firstName, lastName, email } = formData.about;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      firstName.trim().length > 0 && 
      lastName.trim().length > 0 && 
      email.trim().length > 0 && 
      emailRegex.test(email)
    );
  }, [formData.about]);

  const isAccountValid = useMemo(() => {
    const { username, password, confirmPassword, secretQuestion, answer } = formData.account;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (
      username.length >= 6 &&
      password.length > 0 &&
      passwordRegex.test(password) &&
      confirmPassword.length > 0 &&
      password === confirmPassword &&
      secretQuestion.length > 0 &&
      answer.trim().length > 0
    );
  }, [formData.account]);

  const isAddressValid = useMemo(() => {
    const { streetName, streetNumber, city, country } = formData.address;
    return (
      streetName.trim().length > 0 && 
      streetNumber.trim().length > 0 && 
      city.trim().length > 0 && 
      country.length > 0
    );
  }, [formData.address]);

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 0:
        return isAboutValid;
      case 1:
        return isAccountValid;
      case 2:
        return isAddressValid;
      default:
        return false;
    }
  }, [currentStep, isAboutValid, isAccountValid, isAddressValid]);

  const progressPercentage = useMemo(() => {
    const validSteps = [isAboutValid, isAccountValid, isAddressValid].filter(
      Boolean
    ).length;
    return (validSteps / 3) * 100;
  }, [isAboutValid, isAccountValid, isAddressValid]);

  // Handlers
  const onFieldChange = useCallback((step, field, value) => {
    dispatch({ type: "SET_FIELD", step, field, value });
  }, []);

  const onFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size should be less than 5MB');
          return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          onFieldChange("about", "avatarPreview", e.target.result);
          onFieldChange("about", "avatar", file);
        };
        reader.readAsDataURL(file);
      }
    },
    [onFieldChange]
  );

  const nextStep = () => {
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    if (isAddressValid) {
      setShowSummaryModal(true);
      onHide();
      onSubmitSuccess(formData);
    }
  };

  const handleCloseModal = () => {
    onHide();
    setCurrentStep(0);
    dispatch({ type: "RESET_FORM" });
  };

  const handleStepClick = (stepIndex) => {
    // Allow navigation to completed steps only
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <AboutForm
            data={formData.about}
            onFieldChange={onFieldChange}
            onFileChange={onFileChange}
          />
        );
      case 1:
        return (
          <AccountForm data={formData.account} onFieldChange={onFieldChange} />
        );
      case 2:
        return (
          <AddressForm data={formData.address} onFieldChange={onFieldChange} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Main Builder Modal */}
      <Modal
        show={show}
        onHide={handleCloseModal}
        size="lg"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            BUILD YOUR PROFILE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Progress Bar */}
          <ProgressBar
            now={progressPercentage}
            className="mb-4"
            variant="success"
            style={{ height: "8px" }}
            striped
            animated={progressPercentage < 100}
          />

          {/* Step Navigation */}
          <Nav variant="pills" className="justify-content-center mb-4">
            {steps.map((step, index) => (
              <Nav.Item key={step}>
                <Nav.Link
                  active={currentStep === index}
                  disabled={index > currentStep}
                  onClick={() => handleStepClick(index)}
                  className={`mx-1 ${
                    currentStep === index 
                      ? "bg-success text-white" 
                      : index < currentStep 
                        ? "bg-light text-success" 
                        : "text-muted"
                  }`}
                  style={{ 
                    cursor: index <= currentStep ? 'pointer' : 'not-allowed',
                    minWidth: '80px'
                  }}
                >
                  {step}
                  {index < currentStep && (
                    <span className="ms-1">✓</span>
                  )}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Step Content */}
          <div style={{ minHeight: "400px" }}>
            <div className="fade-in">
              {renderStepContent()}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <div className="d-flex align-items-center">
            <span className="me-3 text-muted">
              Step {currentStep + 1} of {steps.length}
            </span>
            {currentStep < steps.length - 1 ? (
              <Button 
                variant="success" 
                onClick={nextStep} 
                disabled={!isStepValid}
                title={!isStepValid ? "Please fill all required fields" : ""}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleFinish}
                disabled={!isStepValid}
                title={!isStepValid ? "Please fill all required fields" : ""}
              >
                Finish
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>

      {/* Summary Modal */}
      <Modal
        show={showSummaryModal}
        onHide={() => setShowSummaryModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile Created Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileSummary formData={formData} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => setShowSummaryModal(false)}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ProfileBuilderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default ProfileBuilderModal;