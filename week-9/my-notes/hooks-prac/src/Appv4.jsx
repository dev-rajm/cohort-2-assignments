import { useEffect, useState } from 'react';

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = e => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.addEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

function App() {
  const { x, y } = useMousePosition();
  return (
    <div>
      Your mouse position is x:{x} y:{y}
    </div>
  );
}

export default App;
