let sizeMatrix = 10;
let numberOfMines = 10;
const matrix = [];

const body = document.querySelector(".body");

body.innerHTML = "<div class='container'><div class='minesField'></div></div>";

const minesField = document.querySelector(".minesField");

function newMatrix() {
  for (let i = 0; i < sizeMatrix; i++) {
    matrix.push([]);
    for (let j = 0; j < sizeMatrix; j++) {
      matrix[i].push({ isNotMine: true, isFlag: false, isOpen: false });
    }
  }
}
newMatrix();

function createDom() {
  minesField.innerHTML = "";
  matrix.forEach((_, i) => {
    matrix[i].forEach((_, j) => {
      minesField.innerHTML += "<div class='cell'></div>";
      minesField.style.width = sizeMatrix * 40 + "px";
      minesField.style.height = sizeMatrix * 40 + "px";
    });
  });
}
createDom();
let cell = document.querySelectorAll(".cell");

function createFieldOfMines(firstCell) {
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
        if (element === randomNumber || randomNumber == firstCell) {
          x = true;
        }
      });
    }
    arrayMines[i] = randomNumber;
  });
  console.log(arrayMines);
  arrayMines.forEach((element) => {
    let i = Math.trunc(element / sizeMatrix - 0.1);
    let j = element - i * sizeMatrix - 1;
    matrix[i][j].isNotMine = false;
  });
  matrix.forEach((_, i) => {
    matrix[i].forEach((element, j) => {
      if (matrix[i][j].isNotMine) {
        let n = "";
        if (i > 0 && !matrix[i - 1][j].isNotMine) {
          n++;
        }
        if (i > 0 && j < sizeMatrix - 1 && !matrix[i - 1][j + 1].isNotMine) {
          n++;
        }
        if (j < sizeMatrix - 1 && !matrix[i][j + 1].isNotMine) {
          n++;
        }
        if (
          i < sizeMatrix - 1 &&
          j < sizeMatrix - 1 &&
          !matrix[i + 1][j + 1].isNotMine
        ) {
          n++;
        }
        if (i < sizeMatrix - 1 && !matrix[i + 1][j].isNotMine) {
          n++;
        }
        if (i < sizeMatrix - 1 && j > 0 && !matrix[i + 1][j - 1].isNotMine) {
          n++;
        }
        if (j > 0 && !matrix[i][j - 1].isNotMine) {
          n++;
        }
        if (i > 0 && j > 0 && !matrix[i - 1][j - 1].isNotMine) {
          n++;
        }
        matrix[i][j].isNotMine = n;
      }
    });
  });
}

function refactorDom() {
  let i, j;
  cell.forEach((element, k) => {
    i = Math.trunc(k / sizeMatrix);
    j = k - i * sizeMatrix;
    if (matrix[i][j].isOpen) {
      element.style.outline = "none";
      if (matrix[i][j].isNotMine) {
        element.innerHTML = matrix[i][j].isNotMine;
      } else {
        element.innerHTML = "*";
        element.classList.add("mine");
      }
    }
  });
}
refactorDom();

function gameOver() {
  matrix.forEach((_, i) =>
    matrix[i].forEach((element, j) => {
      if (!element.isNotMine) {
        element.isOpen = true;
      }
    })
  );
}

console.log(matrix);

cell.forEach((element, k) => {
  element.addEventListener("click", (event) => {
    matrix.forEach((_, i) => {
      matrix[i].forEach((element) => {
        if (!element.isOpen) {
          console.log(k);
          createFieldOfMines(k);
        }
      });
    });

    let i = Math.trunc(k / sizeMatrix);
    let j = k - i * sizeMatrix;
    if (!matrix[i][j].isOpen) {
      matrix[i][j].isOpen = true;
      if (!matrix[i][j].isNotMine) {
        gameOver();
      }
    }
    refactorDom();
  });
});
