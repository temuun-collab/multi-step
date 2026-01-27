"use client";

import { useState, useEffect } from "react";

export const StepThree = (props) => {
  const { handleNextStep, handleBackStep } = props;
  const [formValues, setFormValues] = useState({
    dateBirth: "",
    file: "",
    image: "",
  });
  const [imgUrl, setImgUrl] = useState(null);
  const [errorState, setErrorState] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const values = localStorage.getItem("stepThree");
      if (values) {
        try {
          const parsed = JSON.parse(values);
          setFormValues({
            dateBirth: parsed.dateBirth || "",
            file: parsed.file || "",
            image: parsed.image || "",
          });
          if (parsed.image) {
            setImgUrl(parsed.image);
          }
        } catch (error) {
          console.error("Parse error:", error);
        }
      }
    }
  }, []);

  const addStepThreeToLocalStorage = (values) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("stepThree", JSON.stringify(values));
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setFormValues({ ...formValues, dateBirth: value });

    if (errorState.dateBirth && value) {
      setErrorState((prev) => ({ ...prev, dateBirth: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      setFormValues({ ...formValues, image: url, file: file.name });

      if (errorState.image) {
        setErrorState((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const handleRemoveImage = () => {
    setImgUrl(null);
    setFormValues({ ...formValues, image: "", file: "" });
  };

  const validateInput = () => {
    const errors = {};

    if (!formValues.dateBirth) {
      errors.dateBirth = "Please select a date.";
    }

    if (!imgUrl) {
      errors.image = "Image cannot be blank.";
    }

    return errors;
  };

  const handleButtonClick = () => {
    const errors = validateInput();

    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepThreeToLocalStorage({ ...formValues, image: imgUrl });
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };

  const isButtonDisabled = !formValues.dateBirth || !imgUrl;

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
          <div style={{ display: "flex", gap: "2px" }}>
            <p className="text-field">Date of Birth</p>
            <p style={{ color: "red" }}>*</p>
          </div>
          <input
            type="date"
            name="dateBirth"
            value={formValues.dateBirth || ""}
            min="1900-01-01"
            max="2025-12-31"
            className={
              errorState.dateBirth ? "input-container1" : "input-container"
            }
            onChange={handleDateChange}
          />
          {errorState.dateBirth && (
            <p className="helper-text">{errorState.dateBirth}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-container1">
          <div style={{ display: "flex", gap: "2px" }}>
            <p className="text-field">Profile image</p>
            <p style={{ color: "red" }}>*</p>
          </div>

          {!imgUrl && (
            <button className="button2">
              <img src="./image.png" alt="Upload icon" />
              <input
                type="file"
                name="file"
                accept="image/*"
                className="input-image ml-23"
                onChange={handleImageUpload}
              />
            </button>
          )}

          {imgUrl && (
            <div className="image relative">
              <img
                src={imgUrl}
                alt="Profile preview"
                style={{
                  width: "416px",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
              <div className="flex justify-end">
                <button
                  className="remove-button absolute z-10"
                  onClick={handleRemoveImage}
                >
                  <img
                    src="./remove.png"
                    alt="Remove"
                    style={{ width: "7px", height: "7px" }}
                  />
                </button>
              </div>
            </div>
          )}

          {errorState.image && (
            <p className="helper-text">{errorState.image}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button className="button1" onClick={handleBackStep}>
          <img
            src="./vector1.png"
            alt="Back arrow"
            style={{ height: "8px", width: "4px" }}
          />
          <p>Back</p>
        </button>
        <button
          className="button"
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
        >
          <p>Continue 3/3</p>
          <img
            src="./vector.png"
            alt="Next arrow"
            style={{ height: "12px", width: "12px" }}
          />
        </button>
      </div>
    </div>
  );
};
