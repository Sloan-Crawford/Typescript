// set the type of age variable to number and initialize it to 20:
let age: number = 20; // this is called annotating the variable
if (age < 50)
 age += 10;

console.log(age); // -> 30

let sales: number = 123_456_789; // in TS you can separate large numbers with _
let course = 'TypeScript'; // annotation not necessary. TS knows it it is a string.
let is_published = true; // same thing but this time it is a boolean.
let level; // TS assumes it is a type 'any' if nothing is initialized. avoid using.

function render(document: any) { // explicitly annotate to 'any' if any is only option.
 console.log(document);
}


// --------Arrays-----------
let numbers: number[] = []; // annotation is required so the array is not type 'any'.
// numbers.forEach(n => n.) // code completion options appear after typing n.


// --------Tuples-----------
// a fixed-length array where each element is a particular assigned type.
// best practice to reduce tuples to 2 values only (like a key value pair).
let user: [number, string] = [1, 'Mosh'];
// user[0]. intelisense gives code completion options of methods after typing .


// --------Enums----------- 
// used to represent a list of constants
// optimize by assigning an enum to a const:
const enum Size { Small = 1, Medium, Large}; // compiler assigns values to Medium = 2, etc.
let mySize: Size = Size.Medium;
console.log(mySize); // -> 2


// --------Functions-----------
// best practice to annotate params and return types.
// enable "noUnusedParameters", "noImplicitReturns" and "noUnusedLocals" in config to avoid bugs.
function calculateTax(income: number, taxYear: number): number { // : number annotates return type
 if (taxYear < 2022)
  return income * 1.2;
 return income * 1.3;
}
calculateTax(10_000, 2022); // to call the function, requires EXACTLY two params as above.

// or... add a ? after a param name to make that param optional when called. not a good way.
// a better way is to give a param a default value:
function calculateTax2(income: number, taxYear = 2022): number { // taxYear default is now 2022
 if (taxYear < 2022) 
  return income * 1.2;
 return income * 1.3;
}
calculateTax2(10_000); // to call the function, can give one value, other defaults to 2022.


// --------Objects-----------
let employee: {  // annotate type for each element within the object:
 readonly id:number, // read only prevents TypeScript from modifying this property.
 name: string
 // every object should have a retirement method, so need to define signature of this method:
 // specify how many params, the type of each param, and the type of the return value:
 retire: (date: Date) => void; 
} = { 
 id: 1, 
 name: 'Sloan',
 retire: (date: Date) => {
  console.log(date);
 }
}; // this way of using objects with TypeScript is verbose. Better way explored below...

// --------Type Aliases-----------
// we can define a custom type. then define all properties/methods an employee object should have:
type Employee = {
 readonly id: number,
 name: string,
 retire: (date: Date) => void
}

// now that the new type Employee is stored and shaped, can reuse in multiple places:
let employee2: Employee = {
 id: 2,
 name: 'Michelle',
 retire: (date: Date) => {
  console.log(date);
 }
}


// --------Union Types (|)-----------
// We can give a variable/function parameter more than one type:
function kgToLbs (weight: number | string): number { // param can now be number or string.
 // Narrowing:
 if (typeof weight === 'number') 
  return weight * 2.2;
 else 
  return parseInt(weight) * 2.2;
 
} 

kgToLbs(10); // -> 22
kgToLbs('10kg'); // -> 22


// --------Intersection Types (&)-----------
// another technique for combining types 
type Draggable = {
 drag: () => void
};

type Resizable = {
 resize: () => void
};

type UIWidget = Draggable & Resizable; // this is the intersection type.
// now when it is used, need to define all methods within each variable that uses that type:
let textBox: UIWidget = {
 drag: () => {},
 resize: () => {}
}


// --------Literal Types (exact)-----------
// sometimes we want to limit the values we can assign to a variable. use literal types:
type Quantity = 50 | 100; // first create a union type
let quantity: Quantity = 100; // then anotate variable with the new type 'Quantity'.
// literal types can be strings too:
type Metric = 'cm' | 'inch';


// --------Nullabe Types (null | undefined)-----------
// common source of bugs. never activate "strictNullChecks": false in tsconfig.
// a way to use null or undefined appropriately using union types:
function greet(name: string | null | undefined) {
 if (name)
  console.log(name.toUpperCase());
 else 
  console.log('Hola!');
  
}

greet(null); // can be done now because it was annotated in the params above.
greet(undefined); // same with this one.


// --------Optional Chaining (?.) -----------
type Customer = {
 birthday?: Date // birthday property is now optional (property?).
};

function getCustomer(id: number): Customer | null | undefined { // can return a union type too.
 return id === 0 ? null : { birthday: new Date() }; // if id is 0, return null, otherwise :
}

let customer = getCustomer(0);
// if (customer !== null && customer !== undefined) // *this is key to avoid a compilation errors
// better way to write it using the Optional Property Access Operator (?.):
 console.log(customer?.birthday?.getFullYear()); // executed only if customer and birthday exist.

// Optional Element Access Operator (element?.):
// customers?.[0]

// Optional Call (function(?.)):
let log: any = (message: string) => console.log(message);
log?.('message 1'); // this gets called only if log is referencing an actual function (it is)

