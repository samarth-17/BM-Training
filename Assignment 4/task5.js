function processData(arr, callback) {
    console.log("Original Array:", arr);
    return callback(arr); 
}


function doubleNumbers(arr) {
    return arr.map(num => num * 2);
}

function calculateSum(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}


function findMax(arr) {
    return Math.max(...arr);
}

const arr = [1, 54, 8, 7, 9];

console.log("Doubled Numbers:", processData(arr, doubleNumbers));
console.log("Sum of Numbers:", processData(arr, calculateSum));
console.log("Maximum Number:", processData(arr, findMax));
