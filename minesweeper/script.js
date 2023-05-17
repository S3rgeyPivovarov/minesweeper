let sizeMatrix = 10;
let numberOfMines = 10;
const matrix = [];

const body = document.querySelector(".body");

body.innerHTML = "<div class='container'><div class='minesField'></div></div>";

const minesField = document.querySelector(".minesField");

function newMatrix(firstCell) {
  for (let i = 0; i < sizeMatrix; i++) {
    matrix.push([]);
    for (let j = 0; j < sizeMatrix; j++) {
      matrix[i].push({ isNotMine: true, isFlag: false, isOpen: false });
    }
  }
  function fuRandomNumber() {
    return Math.trunc(Math.random() * sizeMatrix ** 2 - 0.0001);
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

  arrayMines.forEach((element) => {
    let i = Math.trunc(element / sizeMatrix);
    let j = element % sizeMatrix;
    matrix[i][j].isNotMine = false;
    console.log(i, j, matrix);
  });
  matrix.forEach((_, i) => {
    matrix[i].forEach((_, j) => {
      if (matrix[i][j].isNotMine) {
        let n = 0;
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
        if (n) {
          matrix[i][j].isNotMine = n;
        } else {
          matrix[i][j].isNotMine = true;
        }
      }
    });
  });
}

function createDom() {
  minesField.innerHTML = "";
  for (let i = 0; i < sizeMatrix ** 2; i++) {
    minesField.innerHTML += "<div class='cell'></div>";
    minesField.style.width = sizeMatrix * 40 + "px";
    minesField.style.height = sizeMatrix * 40 + "px";
  }
}
createDom();
let cell = document.querySelectorAll(".cell");

function refactorDom() {
  let i, j;
  cell.forEach((element, k) => {
    i = Math.trunc(k / sizeMatrix);
    //уточнить
    j = k % sizeMatrix;
    if (matrix[i][j].isOpen) {
      element.style.outline = "none";
      if (matrix[i][j].isNotMine) {
        if (matrix[i][j].isNotMine === true) {
          element.innerHTML = "";
        } else {
          element.innerHTML = matrix[i][j].isNotMine;
        }
      } else {
        element.innerHTML = "*";
        element.classList.add("mine");
      }
    }
  });
}

function gameOver() {
  matrix.forEach((_, i) =>
    matrix[i].forEach((element, j) => {
      if (!element.isNotMine) {
        element.isOpen = true;
      }
    })
  );
}

let matrixIsCreate = false;

cell.forEach((element, k) => {
  element.addEventListener("click", (event) => {
    if (!matrixIsCreate) {
      newMatrix(k);
      matrixIsCreate = true;
    }

    let i = Math.trunc(k / sizeMatrix);
    let j = k % sizeMatrix;
    if (!matrix[i][j].isOpen) {
      matrix[i][j].isOpen = true;
      if (!matrix[i][j].isNotMine) {
        gameOver();
      }
    }
    refactorDom();
  });
});

function openingFreeCell() {}
