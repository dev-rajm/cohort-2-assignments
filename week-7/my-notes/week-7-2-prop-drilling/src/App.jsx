import { useState } from "react";

/*
If there is an component tree c1, c2, c3 and c4(c1->c2->c3->c4). If there is something c4 needed and c1 has that thing, you have to pass that thing down from c1->c2->c3->c4 even tho c2 and c3 doesn't need that think. This phenomenon of passing props down its called prop drilling.
*/

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      {/* Drilling setCount down to the Buttons */}
      <Count count={count} setCount={setCount} />
    </div>
  );
}

function Count({ count, setCount }) {
  return (
    <div>
      {count}
      <Buttons count={count} setCount={setCount} />
    </div>
  );
}

function Buttons({ count, setCount }) {
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default App;
