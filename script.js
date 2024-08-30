const gridContainer = document.querySelector(".container");

for (let i = 0; i < 16 * 16; i++) {
  const gridCell = document.createElement("div");
  gridCell.classList.add("cell");

  gridContainer.appendChild(gridCell);
}