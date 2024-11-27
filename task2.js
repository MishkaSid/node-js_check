//Michael Sidoruk , Nadav Sayag

//task 2
//print prime numbers smaller than 237

for (let i = 2; i < 237; i++) 
    [...Array(i).keys()].slice(2).every((divisor) => i % divisor !== 0) && console.log(i);
  

