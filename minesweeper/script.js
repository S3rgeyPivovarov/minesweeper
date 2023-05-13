let sizeMatrix = 16;
const matrix = [];
const cell = { isMine: false, flag: false, open: false };

for (let i = 0; i < sizeMatrix; i++) {
  matrix.push([]);
  for (let j = 0; j < sizeMatrix; j++) {
    matrix[i].push([Object.assign({}, cell)]);
  }
}

let numberOfMines = 10;
let n = 256
const number = [];
const numberOfCellsWithMines = [...Array(numberOfMines).keys()];
console.log(number);
while (number.lenth < n)