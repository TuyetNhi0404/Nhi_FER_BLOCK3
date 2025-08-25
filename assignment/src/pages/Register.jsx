import React, { useReducer, useState, useMemo, useCallback, useContext } from "react";
import { Modal, ProgressBar, Nav, Button } from "react-bootstrap";
import AboutForm from "../components/AboutForm";
import AccountForm from "../components/AccountForm";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  about: {
    fullname: "",
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
};

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

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, dispatch] = useReducer(formReducer, initialFormState);
  const { register } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const steps = ["About", "Account"];

  // ---- VALIDATIONS ----
  const isAboutValid = useMemo(() => {
    const { fullname, email } = formData.about;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return fullname.trim().length > 0 && emailRegex.test(email);
  }, [formData.about]);

  const isAccountValid = useMemo(() => {
    const { username, password, confirmPassword, secretQuestion, answer } =
      formData.account;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return (
      username.trim().length >= 6 &&
      passwordRegex.test(password) &&
      password === confirmPassword &&
      secretQuestion.trim().length > 0 &&
      answer.trim().length > 0
    );
  }, [formData.account]);

  // ✅ Sửa dependency thiếu currentStep
  const isStepValid = useMemo(() => {
    return currentStep === 0 ? isAboutValid : isAccountValid;
  }, [currentStep, isAboutValid, isAccountValid]);

  const progressPercentage = useMemo(() => {
    const validSteps = [isAboutValid, isAccountValid].filter(Boolean).length;
    return (validSteps / steps.length) * 100;
  }, [isAboutValid, isAccountValid, steps.length]);

  // ---- HANDLERS ----
  const onFieldChange = useCallback((step, field, value) => {
    dispatch({ type: "SET_FIELD", step, field, value });
  }, []);

  const onFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        toast.addToast({ bg: "danger", body: "Avatar must be ≤ 2MB" });
        return;
      }
      if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
        toast.addToast({ bg: "danger", body: "Avatar must be jpg or png" });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onFieldChange("about", "avatarPreview", e.target.result);
        onFieldChange("about", "avatar", file);
      };
      reader.readAsDataURL(file);
    },
    [onFieldChange, toast]
  );

  const nextStep = () => {
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleFinish = async () => {
    if (!isAccountValid) return;
    const form = {
      fullname: formData.about.fullname,
      email: formData.about.email,
      avatar: formData.about.avatarPreview,
      username: formData.account.username,
      password: formData.account.password,
      confirm: formData.account.confirmPassword,
      secretQuestion: formData.account.secretQuestion,
      answer: formData.account.answer,
    };
    await register(form);
    toast.addToast({
      bg: "success",
      body: "Registration successful. You are now signed in.",
    });
    navigate("/");
  };

  const renderStepContent = () =>
    currentStep === 0 ? (
      <AboutForm
        data={formData.about}
        onFieldChange={onFieldChange}
        onFileChange={onFileChange}
      />
    ) : (
      <AccountForm data={formData.account} onFieldChange={onFieldChange} />
    );

  return (
    <Modal
      show={true}
      centered
      backdrop="static"
      size="lg"
      className="dark-modal"
    >
      <Modal.Header>
        <Modal.Title className="w-100 text-center text-success">
          CREATE ACCOUNT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <ProgressBar
          now={progressPercentage}
          className="mb-4"
          variant="success"
          style={{ height: "8px" }}
        />

        <Nav variant="pills" className="justify-content-center mb-4">
          {steps.map((step, index) => (
            <Nav.Item key={step}>
              <Nav.Link
                active={currentStep === index}
                disabled={index > currentStep}
                onClick={() => index <= currentStep && setCurrentStep(index)}
                className={`mx-1 ${
                  currentStep === index
                    ? "bg-success text-white"
                    : index < currentStep
                    ? "bg-light text-success"
                    : "text-muted"
                }`}
                style={{
                  cursor: index <= currentStep ? "pointer" : "not-allowed",
                  minWidth: "100px",
                }}
              >
                {step} {index < currentStep && <span className="ms-1">✓</span>}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <div style={{ minHeight: "360px" }}>{renderStepContent()}</div>
      </Modal.Body>
      <Modal.Footer className="bg-dark text-white d-flex justify-content-between">
        {currentStep > 0 ? (
          <Button variant="outline-light" onClick={prevStep}>
            Previous
          </Button>
        ) : (
          <div />
        )}
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
      </Modal.Footer>
    </Modal>
  );
}
