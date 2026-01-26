"use client";

import { useState, useEffect } from "react";
import { FormInput } from "../_components/form-input";

export const StepOne = (props) => {
  const { handleNextStep } = props;
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
  });
  const [errorState, setErrorState] = useState({});
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const values = localStorage.getItem("stepOne");
      if (values) {
        try {
          setFormValues(JSON.parse(values));
        } catch (error) {
          console.error("Parse error:", error);
        }
      }
    }
  }, []);

  const checkInputHasSpecialCharacter = (string) => {
    return /[!@#$%^&*()_+{}":?><]/.test(string);
  };

  const checkInputHasSpecialNumber = (string) => {
    return /\d/.test(string);
  };

  const addStepOneToLocalStorage = (values) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("stepOne", JSON.stringify(values));
    }
  };

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const validateInput = () => {
    const errors = {};

    if (
      checkInputHasSpecialNumber(formValues.firstName) ||
      checkInputHasSpecialCharacter(formValues.firstName)
    ) {
      errors.firstName = "input should";
    } else if (formValues.firstName.length < 3) {
      errors.firstName = "input should";
    }

    if (
      checkInputHasSpecialNumber(formValues.lastName) ||
      checkInputHasSpecialCharacter(formValues.lastName)
    ) {
      errors.lastName = "last name input should";
    } else if (formValues.lastName.length < 3) {
      errors.lastName = "last name input should";
    }

    if (
      checkInputHasSpecialNumber(formValues.userName) ||
      checkInputHasSpecialCharacter(formValues.userName)
    ) {
      errors.userName = "user name input should";
    } else if (formValues.userName.length < 3) {
      errors.userName = "user name input should";
    }

    return errors;
  };

  const handleButtonClick = () => {
    const errors = validateInput();

    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepOneToLocalStorage(formValues);
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };

  const shouldDisableButton = () => {
    return (
      formValues.firstName.length === 0 ||
      formValues.lastName.length === 0 ||
      formValues.userName.length === 0
    );
  };

  if (!mounted) {
    return (
      <div className="form-container">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="container">
        <div className="from-header">
          <img src="./logo.png" className="logomain" alt="Logo" />
          <h1 style={{ fontSize: "26px", color: "black", fontWeight: "600" }}>
            Join Us! 😎
          </h1>
          <h1 style={{ fontSize: "18px", color: "#8E8E8E", fontWeight: "400" }}>
            Please provide all current information accurately.
          </h1>
        </div>
        <div className="form-container1">
          <FormInput
            inputTag={"First Name"}
            handleChange={handleInputChange}
            name={"firstName"}
            placeholder={"Firstname"}
            value={formValues.firstName}
            error={errorState.firstName}
            errorMessage={
              "First name cannot contain special characters or numbers."
            }
          />
          <FormInput
            inputTag={"Last Name"}
            handleChange={handleInputChange}
            name={"lastName"}
            placeholder={"Lastname"}
            value={formValues.lastName}
            error={errorState.lastName}
            errorMessage={
              "Last name cannot contain special characters or numbers."
            }
          />
          <FormInput
            inputTag={"User Name"}
            handleChange={handleInputChange}
            name={"userName"}
            placeholder={"Username"}
            value={formValues.userName}
            error={errorState.userName}
            errorMessage={
              "This username is already taken. Please choose another one."
            }
          />
        </div>
      </div>
      <div style={{ paddingTop: "159px" }}>
        <button
          onClick={handleButtonClick}
          disabled={shouldDisableButton()}
          className="button"
        >
          <p>Continue 1/3</p>
          <img
            src="./vector.png"
            style={{ height: "12px", width: "12px" }}
            alt="Arrow"
          />
        </button>
      </div>
    </div>
  );
};
