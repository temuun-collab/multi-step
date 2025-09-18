export const FormInput = (props) => {
  const {
    error,
    value,
    inputTag,
    handleChange,
    name,
    errorMessage,
    placeholder,
  } = props;

  return (
    <div>
      <div style={{ display: "flex", gap: "2px" }}>
        <p className="text-field">{inputTag}</p>
        <p style={{ color: "red" }}>*</p>
      </div>
      <input
        className={error ? "input-container1" : "input-container"}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={value}
      ></input>
      {error && <p className="helper-text">{errorMessage}</p>}
    </div>
  );
};
