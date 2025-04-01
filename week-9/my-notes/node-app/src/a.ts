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
