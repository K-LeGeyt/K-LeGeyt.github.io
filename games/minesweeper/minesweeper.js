document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

// old board object
/* var board = {
  cells:[
    { row: 0, col: 0, isMine: false, hidden: true }, { row: 0, col: 1, isMine: false, hidden: true }, { row: 0, col: 2, isMine: false, hidden: true },
    { row: 1, col: 0, isMine: true, hidden: true }, { row: 1, col: 1, isMine: false, hidden: true }, { row: 1, col: 2, isMine: false, hidden: true },
    { row: 2, col: 0, isMine: true, hidden: true }, { row: 2, col: 1, isMine: false, hidden: true }, { row: 2, col: 2, isMine: false, hidden: true },
  ]
} */ 

let board = {};

// generate the board
function createBoard() {
  let boardSize = 6;
  let idCount = 0;
  let createNewBoard = {cells:[]}
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      cell = {id: idCount++, row: i, col: j, isMine: false, hidden: true}
      createNewBoard.cells.push(cell)
    } 
  }
  board = createNewBoard;
  assignMines()
}

// assign mines randomly
function assignMines() {
  let mineCount = document.getElementById("mineNum").value;
  for (let i = 0; i < mineCount; i++) {
    let cellId = getRandomNumber(0, board.cells.length - 1);
    board.cells[cellId].isMine = true;
  }
  return board;
}

// random number utility
let getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * ( max - min)) + min;
}

function startGame () {
  createBoard();
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  };
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
  document.getElementById("reset").onclick = resetGame
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && (board.cells[i].isMarked === undefined || !board.cells[i].isMarked)) {
      // if cell is mine and has not been marked yet or has been marked and is now false.
      return;
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      // if the cell is not a mine and is still hidden
      return;
    }
  } // end for loop
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')   
} // end function

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  let surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
// loop through surrounding cells
  let count = 0;
  for (let i = 0; i < surroundingCells.length; i++) {
// check each if it is a mine and add to count variable
    if (surroundingCells[i].isMine) {
      count++
    }
  }
  return count
}

let wonCount = 0;
let lostCount = 0;

// Game reset
function resetGame () {
// add count for win
  if (document.getElementById("message").innerHTML == "<p>You win!</p>") {
    wonCount++;
  };
// add count for loss
  if (document.getElementById("message").innerHTML == "<p>BOOM!</p>") {
    lostCount++;
  }
// reset classes
  document.getElementById("gameboard").classList.remove("hidden");
  document.getElementById("gameboard").classList.remove("mine");
  document.getElementById("gameboard").classList.remove("marked");
  document.getElementById("gameboard").innerHTML = "";

  createBoard();
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  };
  lib.initBoard();
//update display of wins and losses
  document.getElementById("won").innerHTML = "Games Won: " + wonCount;
  document.getElementById("lost").innerHTML = "Games Lost: "  + lostCount
}



