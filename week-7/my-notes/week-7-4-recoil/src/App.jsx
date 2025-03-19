/*
1. What is state management?
-> A cleaner way to store the states of your app,
Until now, the cleanest thing you should do is use Context API.
It let you teleport state.

-> But there are better solution get rid of the problem that context api has (unnecessary re-rendering)
-> It helps you to separate your components and states in two different places.

Example of state management library: recoil, zustand and redux.

2. Recoil
-> Recoil is a state management library created by some ex React folks.
-> Recoil has a concept of an Atom to store the state.
-> An atom can be defined outside the component.
-> Can be teleported in any component.

3. Usages of Recoil
-> Create an atom in separate file
-> useRecoilRoot = similar to context api provider
-> useRecoilState() = similar to useState()
-> useRecoilValue() = similar to count in [count, _]
-> useSetRecoilValue() = similar to the update count function in [_, setCount]
*/

import { useRecoilValue, RecoilRoot, useSetRecoilState } from "recoil";
import { countAtom, evenSelector } from "./store/atom/count";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  console.log("re-render");
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);

  return (
    <div>
      <b>{count}</b>
      <EvenCountRenderer />
    </div>
  );
}

function EvenCountRenderer() {
  const isEven = useRecoilValue(evenSelector);
  return <div>{isEven ? "It is even" : ""}</div>;
}

function Buttons() {
  console.log("re-render button");
  const setCount = useSetRecoilState(countAtom);

  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default App;
