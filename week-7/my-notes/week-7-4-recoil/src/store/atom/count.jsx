import { atom, selector } from "recoil";

// Define an atom
export const countAtom = atom({
  key: "countAtom",
  default: 0,
});

// Selector in recoil is similar like useMemo
export const evenSelector = selector({
  key: "evenSelector",
  get: (props) => {
    const count = props.get(countAtom); // similar like dependence array in useMemo
    return count % 2 == 0;
  },
});
