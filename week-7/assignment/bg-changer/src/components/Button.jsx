import { memo } from "react";

export const Button = memo(({ color, textColor, setColor }) => {
  return (
    <button
      onClick={() => setColor(color)}
      style={{ backgroundColor: color, color: textColor, cursor: "pointer" }}
    >
      {color}
    </button>
  );
});
