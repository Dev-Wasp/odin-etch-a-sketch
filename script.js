const gridContainer = document.querySelector(".container");
const gridSizeBtn = document.querySelector(".grid-size-btn")

const CONTAINER_WIDTH = 400;

for (let i = 0; i < 16 * 16; i++) {
  const gridCell = document.createElement("div");
  gridCell.classList.add("cell");

  gridContainer.appendChild(gridCell);
}

gridContainer.addEventListener("mouseover", e => {
  const cell = (e.target.classList.contains("cell")) ? e.target : null;

  if (!cell) return;

  cell.style.backgroundColor = "#333";
});

gridSizeBtn.addEventListener("click", () => {
  const numOfCells = getNumberOfCells();
  createTheGrid(numOfCells);
});

function getNumberOfCells() {
  let numOfCellsInRow;

  do {
    numOfCellsInRow = parseFloat(prompt("Enter the new number of cells in a row: "));

    const isNaN = numOfCellsInRow === NaN;
    const isFloat = !Number.isInteger(numOfCellsInRow);
    const isOutOfBounds = numOfCellsInRow > 100 || numOfCellsInRow < 1;

    if (isNaN || isFloat || isOutOfBounds) {
      numOfCellsInRow = null;

      alert("Please enter a positive whole number up to a 100");
    }
  } while (numOfCellsInRow === null);

  const numOfCells = numOfCellsInRow**2;

  return numOfCells;
}

function createTheGrid(numOfCells) {
  const newCellWidth = calcNewCellWidth(numOfCells);

  const newCells = genNewCells(newCellWidth, numOfCells);

  removeOldCells();

  addNewCells(newCells);
}

function calcNewCellWidth(numOfCells) {
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