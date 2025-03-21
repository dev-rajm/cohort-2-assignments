import { useState } from "react";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [color, setColor] = useState("white");

  function handleColor() {
    setColor(color);
  }

  return (
    <main style={{ backgroundColor: color }}>
      <div className="colorPicker">
        <Button color="red" setColor={handleColor} />
        <Button color="yellow" setColor={handleColor} />
        <Button color="black" setColor={handleColor} textColor="white" />
        <Button color="purple" setColor={handleColor} />
        <Button color="green" setColor={handleColor} />
        <Button color="orange" setColor={handleColor} />
      </div>
    </main>
  );
}

export default App;
