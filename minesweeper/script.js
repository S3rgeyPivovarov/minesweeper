let sizeMatrix = 15;
let numberOfMines = 50;
const matrix = [];

const body = document.querySelector(".body");

body.innerHTML = "<div class='container'><div class='minesField'></div></div>";

const minesField = document.querySelector(".minesField");

function newDomField() {
  minesField.innerHTML = "";
  let numberOfCell = sizeMatrix ** 2;
  for (let i = 0; i < numberOfCell; i++) {
    minesField.innerHTML += "<div class='cell'>aa</div>";
  }
  minesField.style.width = sizeMatrix * 40 + "px";
  minesField.style.height = sizeMatrix * 40 + "px";
}

newDomField();
function NewMatrix() {
  for (let i = 0; i < sizeMatrix; i++) {
    matrix.push([]);
    for (let j = 0; j < sizeMatrix; j++) {
      matrix[i].push({ isNotMine: true, flag: false, open: false });
    }
  }

  function fuRandomNumber() {
    return Math.floor(Math.random() * sizeMatrix ** 2 + 0.99999999);
  }
  let randomNumber, x;
  const arrayMines = [...Array(numberOfMines)];
  arrayMines.forEach((_, i) => {
    x = true;
    while (x) {
      x = false;
      randomNumber = fuRandomNumber();
      arrayMines.forEach((element) => {
        if (element === randomNumber) {
          x = true;
        }
      });
    }
    arrayMines[i] = randomNumber;
  });

  arrayMines.forEach((element) => {
    i = Math.trunc(element / sizeMatrix - 0.1);
    j = element - i * sizeMatrix - 1;
    matrix[i][j].isNotMine = false;
  });

  matrix.forEach((_, i) => {
    matrix[i].forEach((element, j) => {
      if (element.isNotMine) {
        let n = 0;
        if (i > 0 && !matrix[i - 1][j]) {
          n++;
        }
        if (i > 0 && j < sizeMatrix - 1 && !matrix[i - 1][j + 1]) {
          n++;
        }
        if (j < sizeMatrix - 1 && !matrix[i][j + 1]) {
          n++;
        }
        if (i < sizeMatrix - 1 && j < sizeMatrix - 1 && !matrix[i + 1][j + 1]) {
          n++;
        }
        if (i < sizeMatrix - 1 && !matrix[i + 1][j]) {
          n++;
        }
        if (i < sizeMatrix - 1 && j > 0 && !matrix[i + 1][j - 1]) {
          n++;
        }
        if (j > 0 && !matrix[i][j - 1]) {
          n++;
        }
        if (i > 0 && j > 0 && !matrix[i - 1][j - 1]) {
          n++;
        }
        element.isNotMine = n;
      }
    });
  });
}

NewMatrix();

console.log(matrix);
