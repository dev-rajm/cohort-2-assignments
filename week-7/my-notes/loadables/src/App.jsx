import "./App.css";
import {
  RecoilRoot,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from "recoil";
import { todosAtomFamily } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  // const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id)); //Do this if you want state and state updater both
  const todo = useRecoilValueLoadable(todosAtomFamily(id)); // Do this if only value is required.
  /*
  The todo state variable now no longer like generate state variable, it has something new(object).
  Todo : {
  content: [title, description],
  state: [loading, hasValue]
  }
  */
  if (todo.state === "loading") {
    return <div>loading</div>;
  } else if (todo.state === "hasValue") {
    return (
      <>
        {todo.contents.title}
        {todo.contents.description}
        <br />
      </>
    );
  } else if (todo.state === "hasError") {
    return <div>Error occurs while fetching data from backend</div>;
  }
}

export default App;
