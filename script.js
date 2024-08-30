const gridContainer = document.querySelector(".container");

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