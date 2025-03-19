import { useContext, useState } from "react";
import { CountContext } from "./context";

/*
1. Context API helps you to get raid of passing props down and down(prop drilling).
2. By using Context API props can available in any component that needs that prop by teleport the prop.
3. It lets you kept all your state logic outside of your core react components.
*/

function App() {
  const [count, setCount] = useState(0);

  // After defining a context wrap anyone that wants to use the teleported value inside a provider
  return (
    <>
      <CountContext.Provider value={count}>
        <Count count={count} setCount={setCount} />
      </CountContext.Provider>
    </>
  );
}

// Problem: The problem in context api is here the Count component never used the state variable `count` so the Count component shouldn't re-rendered when state variable count changes but its re-rendered when state count changes.
function Count({ setCount }) {
  console.log("re-rendered");
  return (
    <div>
      <CardRenderer />
      <Buttons setCount={setCount} />
    </div>
  );
}

function CardRenderer() {
  // Use the teleported value of count
  const count = useContext(CountContext);
  return <div>{count}</div>;
}

function Buttons({ setCount }) {
  const count = useContext(CountContext);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default App;
