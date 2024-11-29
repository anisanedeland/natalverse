export default function ReskinnedButton({ text, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "200px",
        height: "60px",
        backgroundImage: `url("/img/red_button.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        color: "white",
        fontSize: "16px",
        fontFamily: "CustomFont, sans-serif",
        display: "flex",
        justifyContent: "center", // Ensures text is horizontally centered
        alignItems: "center",    // Ensures text is vertically centered
        ...style,                // Allows custom styles to be passed
      }}
    >
      {text}
    </button>
  );
}
