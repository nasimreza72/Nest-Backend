
// let num = 535873375657

// function num_of_digits() {

//     return String(num).split("").length
// }

// console.log(num_of_digits())

// let array = [23, -23, 1 ,57, 34]

// function minMax() {
// 	return (Math.min(...array))
// }

// console.log(minMax())

/////////////////////

// let word = ["asde234", "a34de3", "swer", "34", "wwev"]

// function numInStr() {
// 	let arrayOfNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//     let newArray = []
// 	word.filter( a => {
// 		let n = a.split("").filter(b => b == arrayOfNumber.filter(i => String(i) == b))
//         if(n.length > 0){
//             newArray.push(a)  
//         }
// 	})
//     return newArray
// }

// console.log(numInStr());

///////////////


let obj = {
    "Diamond Earrings": 980,
    "Gold Watch": 2250,
    "Pearl Necklace": 4650
  }

function mostExpensive() {
	let array = Object.entries(obj)
	let expensive = array.map((item) => item[1])
	let result = expensive.indexOf(Math.max(...expensive))
	return `The most expensive one is the ${Object.keys(obj)[result]}`
}
console.log(mostExpensive());

/////////////////////