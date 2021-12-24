//Creating the grid
const container = document.getElementById("container");
let fullGrid = false;
let randomColor = false;
let erase = false;
let black = false;

document.getElementById("start").addEventListener("click", () => {
  if (fullGrid == true) {
    deleteGrid();
  }
  createGrid();
  changeSquaresColor();
  fullGrid = true;
});

function createGrid() {
  const squaresNumber = parseInt(
    prompt("Please input a number of squares for the grid. Max 100.")
  );
  let rowColumSize = 350 / squaresNumber;

  for (let i = 1; i <= squaresNumber * squaresNumber; i++) {
    const square = document.createElement("div");
    square.classList = "gridItem";
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

//To change the color of the squares on mouseover
function changeSquaresColor() {
  document.querySelectorAll(".gridItem").forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "black";
      if (erase == true) {
        item.style.backgroundColor = "white";
      } else if (black == true) {
        item.style.backgroundColor = "black";
      } else if (randomColor == true) {
        //This generates a random color in hex
        let randomColorCode = Math.floor(Math.random() * 16777215).toString(16);
        item.style.backgroundColor = `#${randomColorCode}`;
      }
    });
  });
}

//To identify the button clicked (color selected)
document.querySelectorAll(".roundButtons").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.id == "clearBoard") {
      //To erase the board
      document.querySelectorAll(".gridItem").forEach((item) => {
        item.style.backgroundColor = "white";
      });
      console.log(clearBoard);
    } else if (item.id == "black") {
      black = true;
      randomColor = false;
      erase = false;
      console.log(black);
    } else if (item.id == "randomColor") {
      randomColor = true;
      black = false;
      erase = false;
      console.log(randomColor);
    } else if (item.id == "erase") {
      erase = true;
      randomColor = false;
      black = false;
      console.log(erase);
    }
  });
});
