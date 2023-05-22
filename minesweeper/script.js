let sizeMatrix = 10;
let numberOfMines = 1;

let matrixIsCreate = false;

let matrix = [];

let isBlocked = false;

const body = document.querySelector(".body");

body.innerHTML =
  "<div class='container'><div class='menu'>New game</div><div class='minesField'></div></div>";

const minesField = document.querySelector(".minesField");

document
  .querySelector(".container")
  .addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

function createHTMLField() {
  minesField.innerHTML = "";
  for (let i = 0; i < sizeMatrix ** 2; i++) {
    minesField.innerHTML += "<div class='cell'></div>";
    minesField.style.width = sizeMatrix * 40 + "px";
    minesField.style.height = sizeMatrix * 40 + "px";
  }
}
createHTMLField();
let cell = document.querySelectorAll(".cell");

let newGame = document.querySelector(".menu");

newGame.addEventListener("click", (event) => {
  localStorage.setItem("matrix", JSON.stringify(null));
  isBlocked = false;
  matrix = [];
  createMatrix(99999);
  console.log(matrix, JSON.parse(localStorage.getItem("matrix")));
  refactorField();
});

function createMatrix(firstCell) {
  if (!!JSON.parse(localStorage.getItem("matrix"))) {
    console.log(upload, !!JSON.parse(localStorage.getItem("matrix")));
    matrix = JSON.parse(localStorage.getItem("matrix"));
    matrixIsCreate = true;
    refactorField();
  } else {
    for (let i = 0; i < sizeMatrix; i++) {
      matrix.push([]);
      for (let j = 0; j < sizeMatrix; j++) {
        matrix[i].push({
          isNotMine: true,
          isFlag: false,
          isOpen: false,
          isOpenChecked: false,
        });
      }
    }
    function fuRandomNumber() {
      return Math.trunc(Math.random() * sizeMatrix ** 2 - 0.0001);
    }
    let randomNumber, x;
    const arrayMines = [];
    for (let n = 0; n < numberOfMines; n++) {
      arrayMines.push(0);
    }

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
      let i = Math.trunc(element / sizeMatrix);
      let j = element % sizeMatrix;
      matrix[i][j].isNotMine = false;
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
}

function refactorField() {
  let i, j;
  cell.forEach((element, k) => {
    i = Math.trunc(k / sizeMatrix);
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
        element.innerHTML = matrix[i][j].isFlag ? "&check;" : "&#x2715;";
      }
    } else {
      element.style.outline = "";
      if (matrix[i][j].isFlag) {
        element.innerHTML = "!";
      } else if (matrix[i][j].isNotMine === "winEnd") {
        element.innerHTML = "&check;";
      } else {
        element.innerHTML = "";
      }
    }
  });
}

createMatrix();

function openingFreeCell() {
  let isNotFinishCheck = true;
  while (isNotFinishCheck) {
    isNotFinishCheck = false;
    matrix.forEach((_, i) => {
      matrix[i].forEach((element, j) => {
        if (
          element.isOpen === true &&
          element.isOpenChecked === false &&
          element.isNotMine === true
        ) {
          element.isOpenChecked = true;
          isNotFinishCheck = true;
          if (i === 0) {
            if (j === 0) {
              matrix[i + 1][j].isOpen = true;
              matrix[i][j + 1].isOpen = true;
              matrix[i + 1][j + 1].isOpen = true;
            } else if (j === sizeMatrix - 1) {
              matrix[i + 1][j].isOpen = true;
              matrix[i][j - 1].isOpen = true;
              matrix[i + 1][j - 1].isOpen = true;
            } else {
              matrix[i][j - 1].isOpen = true;
              matrix[i][j + 1].isOpen = true;
              matrix[i + 1][j - 1].isOpen = true;
              matrix[i + 1][j].isOpen = true;
              matrix[i + 1][j + 1].isOpen = true;
            }
          } else if (i === sizeMatrix - 1) {
            if (j === 0) {
              matrix[i - 1][j].isOpen = true;
              matrix[i][j + 1].isOpen = true;
              matrix[i - 1][j + 1].isOpen = true;
            } else if (j === sizeMatrix - 1) {
              matrix[i - 1][j].isOpen = true;
              matrix[i][j - 1].isOpen = true;
              matrix[i - 1][j - 1].isOpen = true;
            } else {
              matrix[i][j - 1].isOpen = true;
              matrix[i][j + 1].isOpen = true;
              matrix[i - 1][j - 1].isOpen = true;
              matrix[i - 1][j].isOpen = true;
              matrix[i - 1][j + 1].isOpen = true;
            }
          } else {
            if (j === 0) {
              matrix[i - 1][j].isOpen = true;
              matrix[i - 1][j + 1].isOpen = true;
              matrix[i][j + 1].isOpen = true;
              matrix[i + 1][j].isOpen = true;
              matrix[i + 1][j + 1].isOpen = true;
            } else if (j === sizeMatrix - 1) {
              matrix[i - 1][j].isOpen = true;
              matrix[i - 1][j - 1].isOpen = true;
              matrix[i][j - 1].isOpen = true;
              matrix[i + 1][j].isOpen = true;
              matrix[i + 1][j - 1].isOpen = true;
            } else {
              matrix[i - 1][j].isOpen = true;
              matrix[i - 1][j + 1].isOpen = true;
              matrix[i - 1][j - 1].isOpen = true;
              matrix[i][j + 1].isOpen = true;
              matrix[i][j - 1].isOpen = true;
              matrix[i + 1][j].isOpen = true;
              matrix[i + 1][j + 1].isOpen = true;
              matrix[i + 1][j - 1].isOpen = true;
            }
          }
        }
      });
    });
  }
}

cell.forEach((element, k) => {
  element.addEventListener("click", (event) => {
    if (!isBlocked) {
      if (!matrixIsCreate) {
        createMatrix(k);
        matrixIsCreate = true;
      }

      let i = Math.trunc(k / sizeMatrix);
      let j = k % sizeMatrix;
      if (!matrix[i][j].isOpen) {
        matrix[i][j].isOpen = true;
        if (!matrix[i][j].isNotMine) {
          gameOver();
        } else {
          openingFreeCell();
          isWin();
          localStorage.setItem("matrix", JSON.stringify(matrix));
        }
        refactorField();
      }
      isWin();
      console.log("aa", matrix);
    }
  });
});

cell.forEach((element, k) => {
  element.addEventListener("contextmenu", (event) => {
    if (!isBlocked) {
      let i = Math.trunc(k / sizeMatrix);
      let j = k % sizeMatrix;
      matrix[i][j].isFlag = !matrix[i][j].isFlag;
      refactorField();
    }
  });
});

function isWin() {
  let isChecked = true;
  matrix.forEach((_, i) => {
    matrix[i].forEach((element, j) => {
      isChecked = !element.isOpen && element.isNotMine ? false : isChecked;
    });
  });

  if (isChecked) {
    matrix.forEach((_, i) => {
      matrix[i].forEach((element, j) => {
        element.isNotMine = !element.isNotMine ? "winEnd" : element.isNotMine;
      });
    });
    isBlocked = true;
    localStorage.setItem("matrix", JSON.stringify(null));
    console.log("ss");
    // скрипт победы
  }
}

function gameOver() {
  matrix.forEach((_, i) =>
    matrix[i].forEach((element, j) => {
      if (!element.isNotMine) {
        element.isOpen = true;
      }
    })
  );
  isBlocked = true;
  localStorage.setItem("matrix", JSON.stringify(null));
  //скрипт поражения
}

//при победе флаги не становятся галочкой
