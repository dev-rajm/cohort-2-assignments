import "./App.css";
import { RecoilRoot, useRecoilValue } from "recoil";
import { todosAtomFamily } from "./atoms";

/*
For multiple same components, atom created once and target the same atom.
*/
function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const todo = useRecoilValue(todosAtomFamily(id));

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  );
}

export default App;
