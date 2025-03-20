import { atomFamily } from "recoil";
import { TODOS } from "./todos";

// Create an atom family when you what to create atom dynamically based on your logic,
// it is a function that return a writable atom
export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: (id) => {
    return TODOS.find((x) => x.id === id);
  },
});
