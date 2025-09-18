"use client";

import "tailwindcss";
import { useState } from "react";

export const StepThree = (props) => {
  const { handleBackStep } = props;
  const { handleNextStep } = props;

  const [imgUrl, setImgUrl] = useState();

  const [formValues, setFormValues] = useState({
    dateBirth: "",
    file: "",
  });
  const [errorState, setErrorState] = useState({});
  const handleImageUploud = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const validateInput = () => {
    const errors = {};
    if (!formValues.dateBirth || !formValues.file) {
      setFormValues(errorState);
    }

    return errors;
  };

  const handleBUttonClick = () => {
    const errors = validateInput();

    if (Object.keys(errors).length === 0) {
      setErrorState({});
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };

  //   const shouldDisableButton = () => {
  //     return formValues.dateBirth.length === 0 || formValues.file.length === 0;
  //   };
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
          <input
            type="date"
            name="dateBirth"
            min="2000-01-01"
            max="2025-12-31"
            className={
              formValues.dateBirth ? "input-container1" : "input-container"
            }
          />
          {formValues.dateBirth && (
            <p className="helper-text">Please select a date.</p>
          )}
        </div>
        <div className="form-container1">
          <div style={{ display: "flex", gap: "2px" }}>
            <p className="text-field">Profile image</p>
            <p style={{ color: "red" }}>*</p>
          </div>
          <input
            type="file"
            id="file"
            name="file"
            className="input-image"
            onChange={handleImageUploud}
          />
          {formValues.dateBirth && (
            <p className="helper-text">Image cannot be blank</p>
          )}
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
          //   disabled={shouldDisableButton}
        >
          <p>Continue 3/3</p>
          <img src="./vector.png" style={{ height: "12px", width: "12px" }} />
        </button>
      </div>
    </div>
  );
};
