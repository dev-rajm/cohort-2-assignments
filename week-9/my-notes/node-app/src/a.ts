interface Person {
  name: string;
  age: number;
  greet(phase: string): void;
}

// Implements & extends class from interfaces
class Employee implements Person {
  name: string;
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }

  greet(phase: string) {
    console.log(`${phase} ${this.name}`);
  }
}

const e = new Employee('Raj', 21);
console.log(e.name);

//-------------------------------------------

// Types
type Workers = {
  name: string;
  startingData: string;
};

type Manager = {
  name: string;
  department: string;
};

// Union
type userId = string | number;

// Intersection
type TechLead = Workers & Manager;

//----------------------------------------------

// Array
function maxVal(arr: number[]) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

maxVal([1, 2, 4]);

//-------------------------------------------------

// Enums
type keyInput = 'up' | 'down' | 'right' | 'left'; // Bad approach

enum Direction { // Better approach
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

function doSomething(keyPressed: Direction) {
  if (keyPressed == Direction.UP) {
    console.log('Go Up');
  } else if (keyPressed == Direction.DOWN) {
    console.log('Go Down');
  }
}

// doSomething('up');
doSomething(Direction.UP);

//----------------------------------------------------

// Generics
// type Input = number | string;

// function firstEl(arr: Input[]) {
//   return arr[0];
// }

// const value1 = firstEl([1, 2, 4]);
// console.log(value1);
// const value2 = firstEl(['raj', 'manna']);
// console.log(value2.toUpperCase()); // Not worked because value2 can be a string or a number

function firstEl<T>(arr: T[]) {
  // Generic type => can be anything
  return arr[0];
}

const value1 = firstEl<number>([1, 2, 3]); // set the generic type explicitly
console.log(value1);
const value2 = firstEl<string>(['raj', 'manna']); // set the generic type explicitly
console.log(value2.toUpperCase());
