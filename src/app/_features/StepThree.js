"use client";

import "tailwindcss";
import { useState } from "react";
import { FormInput } from "../_components/form-input";

export const StepThree = (props) => {
  const { handleBackStep } = props;
  const { handleNextStep } = props;

  const addStepThreeToLocalStorage = (values) => {
    localStorage.setItem("stepThree", JSON.stringify(values));
  };
  const getStepThreeValuesFromLocalStorage = () => {
    const values = localStorage.getItem("stepThree");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        dateBirth: "",
        file: "",
        image: "",
      };
    }
  };
  const [formValues, setFormValues] = useState(
    getStepThreeValuesFromLocalStorage()
  );
  const [imgUrl, setImgUrl] = useState(null);
  const [errorState, setErrorState] = useState({});
  const stringObject = JSON.stringify(formValues);
  console.log("string", stringObject);
  console.log(typeof stringObject);

  const object = JSON.parse(stringObject);
  console.log("object", object);
  console.log(typeof object);

  const handleImageUploud = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
  };
  console.log(imgUrl);

  const validateInput = () => {
    const errors = {};
    if (formValues.dateBirth.length === 0 || formValues.file === null) {
      setFormValues(errors);
    }

    return errors;
  };

  const handleBUttonClick = () => {
    const errors = validateInput();

    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepThreeToLocalStorage(formValues);
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };

  const shouldDisableButton = () => {
    return formValues.dateBirth.length === 0 || formValues.file.length === 0;
  };
  const buttonRemove = () => {
    formValues.image === null;
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
          <input
            type="date"
            name="dateBirth"
            min="1900-01-01"
            max="2025-12-31"
            className={
              errorState.dateBirth ? "input-container1" : "input-container"
            }
          />
          {errorState.dateBirth && (
            <p className="helper-text">Please select a date.</p>
          )}
        </div>
        <div className="form-container1">
          <div style={{ display: "flex", gap: "2px" }}>
            <p className="text-field">Profile image</p>
            <p style={{ color: "red" }}>*</p>
          </div>
          {!imgUrl && (
            <>
              <button className="button2">
                <input
                  type="file"
                  name="file"
                  className="input-image"
                  onChange={handleImageUploud}
                />
                <img src="./image.png" />
                <p style={{ color: "black" }}>Add image</p>
              </button>
            </>
          )}
          {formValues.dateBirth && (
            <p className="helper-text">Image cannot be blank</p>
          )}

          {imgUrl && (
            <>
              <div className="image">
                <img
                  src={imgUrl}
                  name="image"
                  style={{
                    width: "416px",
                    height: "180px",
                    objectFit: "cover",
                    position: "relative",
                  }}
                />
                <div>
                  <button className="remove-button" onClick={buttonRemove}>
                    <img
                      src="./remove.png"
                      style={{ width: "7px", height: "7px" }}
                    />
                  </button>
                </div>
              </div>
            </>
          )}

          {errorState.dateBirth && (
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
          disabled={shouldDisableButton()}
        >
          <p>Continue 3/3</p>
          <img src="./vector.png" style={{ height: "12px", width: "12px" }} />
        </button>
      </div>
    </div>
  );
};
