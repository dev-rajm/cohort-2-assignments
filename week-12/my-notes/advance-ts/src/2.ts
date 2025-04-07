// const myname = "Raj";
// myname = "Rishi"; // Cannot allowed to change the constant

const arr = [0, 1, 2, 3];
// arr = [1, 2, 3]; // Not allowed to change the reference
arr[0] = 4; // Allowed to change the internal elements

const obj = {
  name: "raj",
  age: 21,
  relation: "single",
};

// obj = {name: "rishi"} // not allowed
obj.name = "rishi"; // allowed

// Problem: What if I want to prevent the change of internal element too (user readonly)

type UserType = {
  name: string;
  age: number;
  relation: string;
};

const user: Readonly<UserType> = {
  name: "Raj",
  age: 21,
  relation: "single",
};

// user.age = 100; // Now you cannot allowed to change internal values
