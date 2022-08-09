// set the type of age variable to number and initialize it to 20:
let age: number = 20; // this is called annotating the variable
if (age < 50)
 age += 10;

console.log(age); // -> 30

let sales: number = 123_456_789; // in TS you can separate large numbers with _
let course = 'TypeScript'; // annotation not necessary. TS knows it it is a string.
let is_published = true; // same thing but this time it is a boolean.
let level; // TS assumes it is a type 'any' if nothing is initialized. avoid using.

function render(document: any) { // explicitly annotate to any if any is only option.
 console.log(document);
}

// Arrays:
let numbers: number[] = []; // annotation is required so the array is not type 'any'.
// numbers.forEach(n => n.) // code completion options appear after typing n.

// Tuples:
// a fixed-length array where each element is a particular assigned type...
let user: [number, string] = [1, 'Mosh'];
// user[0]. intelisense gives code completion options of methods after typing .

// Enums: 
// used to represent a list of constants
// optimize by assigning an enum to a const
const enum Size { Small = 1, Medium, Large}; // compiler assigns values to Medium = 2, etc.
let mySize: Size = Size.Medium;
console.log(mySize); // -> 2

// Functions:
// best practice to annotate params and return types
// enable "noUnusedParameters", "noImplicitReturns" and "noUnusedLocals" in config to avoid bugs.
function calculateTax(income: number, taxYear: number): number { // : number annotates return type
 if (taxYear < 2022)
  return income * 1.2;
 return income * 1.3;
}
calculateTax(10_000, 2022); // to call the function, requires EXACTLY two params as above

// or... add a ? after a param name to make that param optional when called. not a good way.
// a better way is to give a param a default value:
function calculateTax2(income: number, taxYear = 2022): number { // taxYear default is now 2022
 if (taxYear < 2022) // this adjustment needed
  return income * 1.2;
 return income * 1.3;
}
calculateTax2(10_000); // to call the function, can give one value, other defaults to 2022.