import React, { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import "./MultiStepForm.css";
import { useNavigate } from "react-router-dom";
import {
  validateAddress,
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from "./Validation";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "+91",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!validateEmail(formData.emailId)) newErrors.emailId = "Invalid email address";
      if (!validatePassword(formData.password))
        newErrors.password =
          "Password must contain at least 2 capital letters, 2 small letters, 2 numbers, and 2 special characters";

      setFormErrors(newErrors);
    } else if (step === 2) {
      if (!validateName(formData.firstName))
        newErrors.firstName = "First name must be alphabetic and between 2 and 50 characters";
      if (formData.lastName && !validateName(formData.lastName))
        newErrors.lastName = "Last name must be alphabetic";
      if (!validateAddress(formData.address))
        newErrors.address = "Address must be at least 10 characters long";

      setFormErrors(newErrors);
    } else if (step === 3) {
      if (!(formData.countryCode === "+91" || formData.countryCode === "+1"))
        newErrors.countryCode = "Country code must be +91 or +1";
      if (!validatePhoneNumber(formData.phoneNumber))
        newErrors.phoneNumber = "Phone number must be 10 digits";
      if (!formData.acceptTermsAndCondition)
        newErrors.acceptTermsAndCondition = "You must accept the terms and conditions";

      setFormErrors(newErrors);
    }

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        const response = await fetch("https://codebuddy.review/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.message === "Success") {
          navigate("/posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const getCurrentForm = () => {
    switch (step) {
      case 1:
        return (
          <Form1
            formData={formData}
            formErrors={formErrors}
            setFormData={setFormData}
            setFormErrors={setFormErrors}
          />
        );
      case 2:
        return (
          <Form2
            formData={formData}
            formErrors={formErrors}
            setFormData={setFormData}
            setFormErrors={setFormErrors}
          />
        );
      case 3:
        return (
          <Form3
            formData={formData}
            formErrors={formErrors}
            setFormData={setFormData}
            setFormErrors={setFormErrors}
          />
        );
      default:
        return null;
    }
  };

  const handleTabClick = (tabIndex) => {
    if (tabIndex < step || validateStep()) {
      setStep(tabIndex);
    }
  };

  const tabs = () => {
    return (
      <div className="tabs">
        <div className={`tab ${step === 1 ? "active" : ""}`} onClick={() => handleTabClick(1)}>
          Step 1
        </div>
        <div className={`tab ${step === 2 ? "active" : ""}`} onClick={() => handleTabClick(2)}>
          Step 2
        </div>
        <div className={`tab ${step === 3 ? "active" : ""}`} onClick={() => handleTabClick(3)}>
          Step 3
        </div>
      </div>
    );
  };

  return (
    <div>
      {tabs()}
      {getCurrentForm()}

      <div className="form-buttons">
        <div className="buttons-group">
          <button type="button" onClick={prevStep} disabled={step < 2}>
            Back
          </button>
          <button type="button" onClick={nextStep} disabled={step > 2}>
            Save and Next
          </button>
        </div>

        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default MultiStepForm;
