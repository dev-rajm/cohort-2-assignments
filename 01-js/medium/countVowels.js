/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let cnt = 0;
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  console.log(vowels);
  for (let i = 0; i < str.length; i++) {
    if (str[i] in vowels) {
      console.log(str[i]);
      cnt++;
    } else {
      continue;
    }
  }
  return cnt;
}

console.log(countVowels('a e i o u'));

module.exports = countVowels;
