import { useCallback, useState } from "react";
import { Button } from "./components/Button";
import "./App.css";

const colors = [
  {
    name: "red",
    textColor: "black",
  },
  {
    name: "blue",
    textColor: "white",
  },
  {
    name: "yellow",
    textColor: "black",
  },
  {
    name: "black",
    textColor: "white",
  },
  {
    name: "purple",
    textColor: "white",
  },
  {
    name: "green",
    textColor: "white",
  },
  {
    name: "orange",
    textColor: "black",
  },
];

function App() {
  const [color, setColor] = useState("white");

  const handleColor = useCallback((selectedColor) => {
    setColor(selectedColor);
  }, []);

  return (
    <main style={{ backgroundColor: color }}>
      <div className="colorPicker">
        {colors.map((c) => (
          <Button
            key={c.name}
            color={c.name}
            textColor={c.textColor}
            setColor={handleColor}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
