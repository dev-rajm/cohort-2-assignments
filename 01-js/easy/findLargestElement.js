/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  // let maxEle = numbers[0];
  // for (let i = 0; i < numbers.length; i++) {
  //   if (numbers[i] > maxEle) maxEle = numbers[i];
  // }
  // return maxEle;
  const maxEle = numbers.sort((a, b) => a - b);
  return maxEle[numbers.length - 1];
}

module.exports = findLargestElement;
