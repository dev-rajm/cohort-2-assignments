const fs = require('fs');

function reader() {
  fs.readFile('a.txt', 'utf-8', (err, data) => {
    console.log(data);
  });
}
reader();
console.log('Hi');
