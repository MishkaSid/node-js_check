//Michael Sidoruk , Nadav Sayag

//task 1
//a.
const num = 198
console.log(Number(num % 2 === 0 ||num % 3 === 0 || num % 5 === 0))

//b.
Number(num % 2 === 0 && num % 3 === 0 || num % 2 === 0 && num % 5 === 0 || num % 3 === 0 && num % 5 === 0)===1 &&console.log(2);

//c.
Number(num % 2 === 0 && num % 3 === 0 && num % 5 === 0)===1 &&console.log(3);
