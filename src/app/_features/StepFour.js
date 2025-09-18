export const StepFour = (props) => {
  return (
    <div
      style={{
        width: "480px",
        height: "190px",
        borderRadius: "8px",
        alignItems: "center",
        display: "flex",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <div className="from-header">
        <img src="./logo.png" className="logomain" />
        <h1 style={{ fontSize: "26px", color: "black", fontWeight: "600" }}>
          You're All Set 🔥
        </h1>
        <h1 style={{ fontSize: "18px", color: "#8E8E8E", fontWeight: "400" }}>
          We have received your submission. Thank you!
        </h1>
      </div>
    </div>
  );
};
