"use client";
import { useState, useEffect } from "react";
import { StepOne } from "./_features/StepOne";
import { StepTwo } from "./_features/StepTwo";
import "./index.css";
import { StepThree } from "./_features/StepThree";
import { StepFour } from "./_features/StepFour";

export default function Home() {
  const addCurrentStepValuesFromLocalStorage = (values) => {
    localStorage.getItem("currentStep", JSON.stringify(values));
  };
  const getCurrentStepValuesFromLocalStorage = () => {
    const values = localStorage.getItem("currentStep");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        StepOne: "",
        StepTwo: "",
        StepThree: "",
        StepFour: "",
      };
    }
  };

  const [step, setStep] = useState(3);
  // const [formData, setFormData] = useState(() => {
  //   const saved = localStorage.getItem("currentStep");
  //   return saved ? JSON.parse(saved) : {};
  // });
  // useEffect(() => {
  //   localStorage.setItem("currentStep", JSON.stringify(formData));
  // }, [formData]);
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const stringObject = JSON.stringify(step);
  console.log("string", stringObject);
  console.log(typeof stringObject);

  const object = JSON.parse(stringObject);
  console.log("object", object);
  console.log(typeof object);

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handleBackStep = () => {
    if (step === 1) {
      return;
    } else {
      setStep(step - 1);
    }
  };
  return (
    <>
      {step === 1 && <StepOne handleNextStep={handleNextStep} />}
      {step === 2 && (
        <StepTwo
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 3 && (
        <StepThree
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 4 && <StepFour />}
    </>
  );
}
