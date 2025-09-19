"use client";

import "tailwindcss";
import { useState } from "react";
import { FormInput } from "../_components/form-input";

export const StepTwo = (props) => {
  const { handleBackStep } = props;
  const { handleNextStep } = props;
  const checkInputHasSpecialCharacter = (string) => {
    return /[!#$%^&*()_+{}":?><]/.test(string);
  };
  const checkInputHasSpecialNumber = (string) => {
    return /\d/.test(string);
  };
  const checkInputLetter = (string) => {
    return /[A-Z,a-z]/.test(string);
  };
  const addStepTwoToLocalStorage = (values) => {
    localStorage.setItem("stepTwo", JSON.stringify(values));
  };
  const getStepTwoValuesFromLocalStorage = () => {
    const values = localStorage.getItem("stepTwo");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      };
    }
  };
  const [formValues, setFormValues] = useState(
    getStepTwoValuesFromLocalStorage()
  );
  const [errorState, setErrorState] = useState({});
  const stringObject = JSON.stringify(formValues);
  console.log("string", stringObject);
  console.log(typeof stringObject);

  const object = JSON.parse(stringObject);
  console.log("object", object);
  console.log(typeof object);

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };
  const validateInput = () => {
    const errors = {};
    if (
      !checkInputHasSpecialNumber(formValues.email) ||
      checkInputHasSpecialCharacter(formValues.email)
    ) {
      errors.email = "input should";
    } else if (formValues.email.length < 3) {
      errors.email = "input should";
    }
    if (
      checkInputLetter(formValues.phoneNumber) ||
      checkInputHasSpecialCharacter(formValues.phoneNumber)
    ) {
      errors.phoneNumber = " last name input should";
    } else if (formValues.phoneNumber.length < 8) {
      errors.phoneNumber = " last name input should";
    }
    if (
      !checkInputLetter(formValues.password) ||
      !checkInputHasSpecialCharacter(formValues.password) ||
      !checkInputHasSpecialNumber(formValues.password)
    ) {
      errors.password = "user name input should";
    } else if (formValues.password.length < 8) {
      errors.password = "user name input should";
    }
    if (formValues.confirmPassword !== formValues.password) {
      errors.confirmPassword = "user name input should";
    } else if (formValues.confirmPassword.length < 8) {
      errors.confirmPassword = "user name input should";
    }

    return errors;
  };

  const handleBUttonClick = () => {
    const errors = validateInput();

    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepTwoToLocalStorage(formValues);
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };

  const shouldDisableButton = () => {
    return (
      formValues.email.length === 0 ||
      formValues.password.length === 0 ||
      formValues.phoneNumber.length === 0 ||
      formValues.confirmPassword.length === 0
    );
  };
  return (
    <div className="form-container">
      <div className="container">
        <div className="from-header">
          <img src="./logo.png" className="logomain" />
          <h1 style={{ fontSize: "26px", color: "black", fontWeight: "600" }}>
            Join Us! 😎
          </h1>
          <h1 style={{ fontSize: "18px", color: "#8E8E8E", fontWeight: "400" }}>
            Please provide all current information accurately.
          </h1>
        </div>
        <div className="form-container1">
          <FormInput
            inputTag={"Email"}
            handleChange={handleInputChange}
            name={"email"}
            placeholder={"Email"}
            value={formValues.email}
            error={errorState.email}
            errorMessage={"Please provide a valid email address."}
          />
          <FormInput
            inputTag={"Phone number"}
            handleChange={handleInputChange}
            name={"phoneNumber"}
            placeholder={"Phone number"}
            value={formValues.phoneNumber}
            error={errorState.phoneNumber}
            errorMessage={"Please enter a valid phone number."}
          />
          <FormInput
            inputTag={"Password"}
            handleChange={handleInputChange}
            name={"password"}
            placeholder={"Password"}
            value={formValues.password}
            error={errorState.password}
            errorMessage={"Password must include letters and numbers."}
          />
          <FormInput
            inputTag={"Confirm password"}
            handleChange={handleInputChange}
            name={"confirmPassword"}
            placeholder={"Confirm password"}
            value={formValues.confirmPassword}
            error={errorState.confirmPassword}
            errorMessage={"Passwords do not match. Please try again."}
          />
        </div>
      </div>
      <div className="button-container">
        <button className="button1" onClick={handleBackStep}>
          <img src="./vector1.png" style={{ height: "12px", width: "12px" }} />
          <p>Back</p>
        </button>
        <button
          className="button"
          onClick={handleBUttonClick}
          disabled={shouldDisableButton()}
        >
          <p>Continue 2/3</p>
          <img src="./vector.png" style={{ height: "12px", width: "12px" }} />
        </button>
      </div>
    </div>
  );
};
