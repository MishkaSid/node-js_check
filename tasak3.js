//Michael Sidoruk , Nadav Sayag

//task 3
//calculate zeros's n array
const array = Array(101).fill(0).map((_,index)=>index)
let count = 0
array.forEach(number => {
    String(number).includes('0') ? count++ : count
})
console.log(count)
