function Button({ color, textColor = "black", setColor }) {
  return (
    <button
      onClick={() => setColor(color)}
      style={{ backgroundColor: color, color: textColor }}
    >
      {color}
    </button>
  );
}

export default Button;
