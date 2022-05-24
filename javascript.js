/*
gameboard object

has array going from 0 to 9, representing each of the
squares. 

function putSymbol, takes location and symbol as inputs and changes the array 
accordingly. calls changeturn function

return array, return putSymbol function
*/

let gameBoard = function () {
  let grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const putSymbol = function(location, symbol) {
    grid[location] = symbol;
    //nextTurn();
  };

  return {grid, putSymbol}
}();




/*
gameflow object

private function renderDom. using gameBoard array, renders squares with
event listeners that have unique data-id depending on the array number they are 
given.

function that runs in case event listener is triggered and checks if the 
square is busy or not, if not it calls putSymbol, passes location and symbol
to put in. 

sets private variable "players turn" which determines whos turn it is. 

public function that changes whose turn it is and calls renderDOM.

function that creates first player 
function that creates second player

*/

const player = function (name, symbol) {
  return {name, symbol}
};

let displayController = function (){


  let player1 = player("jack", "X")
  let player2 = player("bob", "O")
  let playerTurn = player1;

  const boardContainer = document.querySelector("#board-container");

  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }

  const renderDom = function () {
    removeAllChildNodes(boardContainer);
    gameBoard.grid.forEach(element => {
      let square = document.createElement("div");
      square.dataset.id = gameBoard.grid.indexOf(element);
      square.classList.add("square")
      if (typeof element === "number"){
        square.addEventListener("click", moveMade);
      }
      else {
        square.innerHTML = element;
      }
      boardContainer.appendChild(square);
    });
  };

  const changeTurn = () => {
    if (playerTurn === player1) {
      playerTurn = player2;
    }
    else {
      playerTurn = player1;
    }
  }

  const moveMade = function(event) {
    const location = event.target.dataset.id;
    const symbol = playerTurn.symbol;
    gameBoard.putSymbol(location, symbol);
    changeTurn();
    renderDom();
  }
  renderDom();
}();




/*
player object 

name: 
symbol: 

*/


