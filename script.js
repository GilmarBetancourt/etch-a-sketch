//************ Global variables **********
//This is to get the --grid-size css variable from the stylesheet.
//Important! For the variable to be accessible in the media query, I had to put it in the "body" element. Not in the ::root
let bodyStyles = window.getComputedStyle(document.body);
let gridSize = bodyStyles.getPropertyValue("--grid-size").substring(0, 4);

const container = document.getElementById("container");
let squaresNumber;
let fullGrid = false;
let randomColor = false;
let color = false;
let erase = false;
let black = false;
let colorPicked = "";

//Creating the grid
document.getElementById("startButton").addEventListener("click", () => {
  if (fullGrid == true) {
    deleteGrid();
  }
  createGrid();
  changeSquaresColor();
  fullGrid = true;
});

function createGrid() {
  startGridValue();

  let rowColumSize = gridSize / squaresNumber;
  for (let i = 1; i <= squaresNumber * squaresNumber; i++) {
    const square = document.createElement("div");
    square.classList = "gridItem";
    container.appendChild(square);
  }
  container.style.gridTemplateColumns = `repeat(${squaresNumber},${rowColumSize}px)`;
  container.style.gridTemplateRows = `repeat(${squaresNumber},${rowColumSize}px)`;
}

//To validate a grid value less than 100.
function startGridValue() {
  squaresNumber = parseInt(
    prompt("Please input a number of squares for the grid. Max 100.")
  );
  if (squaresNumber > 100) {
    squaresNumber = 0;
    alert("Please click Start again and input a number under 100.");
  }
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
      } else if (color == true) {
        item.style.backgroundColor = `${colorPicked}`;
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
    } else if (item.id == "black") {
      black = true;
      randomColor = false;
      erase = false;
    } else if (item.id == "randomColor") {
      randomColor = true;
      black = false;
      erase = false;
    } else if (item.id == "color") {
      item.addEventListener("change", () => {
        color = true;
        randomColor = false;
        black = false;
        erase = false;
        colorPicked = item.value;
      });
    } else if (item.id == "erase") {
      erase = true;
      randomColor = false;
      black = false;
    }
  });
});
