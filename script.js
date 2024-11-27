//task 1
//a.
const num = 198
console.log(Number(num % 2 === 0 ||num % 3 === 0 || num % 5 === 0))

//b.
Number(num % 2 === 0 && num % 3 === 0 || num % 2 === 0 && num % 5 === 0 || num % 3 === 0 && num % 5 === 0)===1 &&console.log(2);

//c.
Number(num % 2 === 0 && num % 3 === 0 && num % 5 === 0)===1 &&console.log(3); 


//task 2
//print prime numbers smaller than 237

for (let i = 2; i < 237; i++) 
    [...Array(i).keys()].slice(2).every((divisor) => i % divisor !== 0) && console.log(i);
  

//task 3
//calculate zeros's n array
const array = Array(101).fill(0).map((_,index)=>index)
let count = 0
array.forEach(number => {
    String(number).includes('0') ? count++ : count
})
console.log(count)
  
