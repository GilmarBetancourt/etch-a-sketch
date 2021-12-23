//Creating the grid
const container = document.getElementById("container");
let fullGrid = false;

document.getElementById("start").addEventListener("click", () => {
  if (fullGrid == true) {
    deleteGrid();
  }
  createGrid();
  fullGrid = true;
});

function createGrid() {
  const squaresNumber = parseInt(
    prompt("Please input a number of squares for the grid. Max 100.")
  );
  let rowColumSize = 350 / squaresNumber;

  for (let i = 1; i <= squaresNumber * squaresNumber; i++) {
    const square = document.createElement("div");
    square.classList = "grid";
    container.appendChild(square);
  }
  container.style.gridTemplateColumns = `repeat(${squaresNumber},${rowColumSize}px)`;
  container.style.gridTemplateRows = `repeat(${squaresNumber},${rowColumSize}px)`;
}

//To empty the grid before creating a new one.
function deleteGrid() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}
