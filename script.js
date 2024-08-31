const CONTAINER_WIDTH = 400;
const INITIAL_CELLS_NUM = 16 * 16;

const gridContainer = document.querySelector(".container");
const gridSizeBtn = document.querySelector(".grid-size-btn")
const rainbowModeBtn = document.querySelector(".rainbow-mode-btn");
const paintModeBtn = document.querySelector(".paint-mode-btn");

let rainbowModeEngaged = false;
let paintModeEngaged = false;

createTheGrid(INITIAL_CELLS_NUM);

gridSizeBtn.addEventListener("click", () => {
  const numOfCells = getNumberOfCells();
  createTheGrid(numOfCells);
});

rainbowModeBtn.addEventListener("click", () => {
  rainbowModeBtn.classList.toggle("active");

  if (rainbowModeEngaged) {
    rainbowModeEngaged = false;
  } else {
    rainbowModeEngaged = true;

    disengageMode("paintMode");
  }
});

paintModeBtn.addEventListener("click", () => {
  paintModeBtn.classList.toggle("active");

  if (paintModeEngaged) {
    paintModeEngaged = false;
  } else {
    paintModeEngaged = true;

    disengageMode("rainbowMode");
  }
});

gridContainer.addEventListener("mouseover", e => {
  const cell = (e.target.classList.contains("cell")) ? e.target : null;

  if (!cell) return;

  if (rainbowModeEngaged) {
    cell.style.backgroundColor = getRandomRGB();
  } else if (paintModeEngaged) {
    increaseOpacity(cell);
  }
  else {
    cell.style.backgroundColor = "#333";
  }
});

function getNumberOfCells() {
  let numOfCellsInRow;

  do {
    // parseFloat is used because if the parseInt were to be used instead, it would get the value even if the user enters a float, leading to confusion
    numOfCellsInRow = parseFloat(prompt("Enter the new number of cells in a row: "));

    const isNaN = numOfCellsInRow === NaN;
    const isFloat = !Number.isInteger(numOfCellsInRow);
    const isOutOfBounds = numOfCellsInRow > 100 || numOfCellsInRow < 1;

    if (isNaN || isFloat || isOutOfBounds) {
      numOfCellsInRow = null;

      alert("Please enter a positive whole number up to a 100");
    }
  } while (numOfCellsInRow === null);

  const numOfCells = numOfCellsInRow ** 2;

  return numOfCells;
}

function createTheGrid(numOfCells) {
  const newCellWidth = calcNewCellWidth(numOfCells);

  const newCells = genNewCells(newCellWidth, numOfCells);

  removeOldCells();

  addNewCells(newCells);
}

function calcNewCellWidth(numOfCells) {
  // This calculation divides the container width by the number of cells in one row to get the perfect width for a single cell. Since this value can be a float with high precision, it also rounds it to one digit after the period.
  // Math.floor is used instead of Math.round to prevent overflowing of cells in rare cases
  const newCellWidth = Math.floor((CONTAINER_WIDTH / Math.sqrt(numOfCells)) * 10) / 10;

  return newCellWidth;
}

function genNewCells(newCellWidth, numOfCells) {
  let newCells = [];

  for (let i = 0; i < numOfCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${newCellWidth}px`;
    cell.style.height = `${newCellWidth}px`;

    newCells.push(cell);
  }

  return newCells;
}

function removeOldCells() {
  const oldCells = document.querySelectorAll(".cell");

  oldCells.forEach(cell => cell.remove());
}

function addNewCells(newCells) {
  newCells.forEach(cell => gridContainer.appendChild(cell));
}

function disengageMode(modeName) {
  if (modeName === "rainbowMode" && rainbowModeEngaged) {
    rainbowModeBtn.dispatchEvent(new Event("click"));
  } else if (modeName === "paintMode" && paintModeEngaged) {
    paintModeBtn.dispatchEvent(new Event("click"));
  }
}

function getRandomRGB() {
  const randomRedValue = Math.floor(Math.random() * 256);
  const randomGreenValue = Math.floor(Math.random() * 256);
  const randomBlueValue = Math.floor(Math.random() * 256);

  const rgbStr = `rgb(${randomRedValue}, ${randomGreenValue}, ${randomBlueValue})`;

  return rgbStr;
}

function increaseOpacity(cell) {
  const backgroundColor = cell.style.backgroundColor;
  const isRGBA = backgroundColor.split('').includes('a');

  if (backgroundColor === '') {
    cell.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  } else if (isRGBA) {
    const opacity = parseFloat(backgroundColor.slice(-4, -1));

    cell.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.1})`;

    // There is no check for if the opacity is 1.0 because style.backgroundColor returns an rgb string in this case, which wouldn't pass the isRGBA check
  }
}