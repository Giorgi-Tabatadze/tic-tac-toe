/*
gameboard object

has array going from 0 to 9, representing each of the
squares. 

function putSymbol, takes location and symbol as inputs and changes the array 
accordingly. calls changeturn function

return array, return putSymbol function
*/  

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}
};

let gameBoard = function () {
  let grid = [0, 1, 2, 
              3, 4, 5, 
              6, 7, 8];

  const putSymbol = function(location, symbol) {
    grid[location] = symbol;
    //nextTurn();
  };

  const clearBoard = () => {
    grid = [0, 1, 2, 
            3, 4, 5, 
            6, 7, 8];
  }

  return {grid, putSymbol, clearBoard}
}();


let displayController = function (player1, player2){

  let playerTurn = player1;
  let rep = 0;
  let winnerDetermined = false;

  const boardContainer = document.querySelector("#board-container");

  const renderBoard = function () {
    removeAllChildNodes(boardContainer);
    gameBoard.grid.forEach(element => {
      let square = document.createElement("div");
      square.dataset.id = gameBoard.grid.indexOf(element);
      square.classList.add("square")
      if (typeof element === "number"){
        if (winnerDetermined === false){
        square.addEventListener("click", moveMade);
        }
      }
      else {
        square.innerText = element;
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
  };

  const moveMade = function(event) {
    const location = event.target.dataset.id;
    const symbol = playerTurn.symbol;
    gameBoard.putSymbol(location, symbol);
    rep += 1;
    checkWin ();
    renderBoard();
    changeTurn();
  };

  const checkWin = () => {
    let message = "";
    if (
      (gameBoard.grid[0] === gameBoard.grid[1] && gameBoard.grid[1] === gameBoard.grid[2]) 
    ||(gameBoard.grid[3] === gameBoard.grid[4] && gameBoard.grid[4] === gameBoard.grid[5])
    ||(gameBoard.grid[6] === gameBoard.grid[7] && gameBoard.grid[7] === gameBoard.grid[8])
    ||(gameBoard.grid[0] === gameBoard.grid[3] && gameBoard.grid[3] === gameBoard.grid[6])
    ||(gameBoard.grid[1] === gameBoard.grid[4] && gameBoard.grid[4] === gameBoard.grid[7])
    ||(gameBoard.grid[2] === gameBoard.grid[5] && gameBoard.grid[5] === gameBoard.grid[8])
    ||(gameBoard.grid[0] === gameBoard.grid[4] && gameBoard.grid[4] === gameBoard.grid[8])
    ||(gameBoard.grid[2] === gameBoard.grid[4] && gameBoard.grid[4] === gameBoard.grid[6])
    ) {
      if (playerTurn === player1) {
        player1.winner = true;
        console.log(`${player1.name} is the winner`);
        winnerDetermined = true;
        //message
      }
      else {
        player2.winner = true;
        console.log(`${player2.name} is the winner`)
        winnerDetermined = true;
        //message
      }
    } else if (rep === 9){
      console.log(`its a draw`)
      winnerDetermined = true;
      //draw
    };
  }
  
  const playAgain = () => {

  };

  const newGame = () => {

  }

  const gameEnd = (message) => {
    
  }

  renderBoard();
};


const displayForm = () => {
  let player1;
  let player2;

  const startGame = () => {
    if (nameInput1.value !== "" && nameInput2.value !== ""){
    let playerName1 = nameInput1.value;
    let playerName2 = nameInput2.value;
    player1 = Player(playerName1, "X");
    player2 = Player(playerName2, "O");
    displayController(player1, player2);
    };
  };

  //cache DOM
  const boardContainer = document.querySelector("#board-container");
  const startForm = document.createElement("form");
  const nameInput1 = document.createElement("input")
  const nameInput2 = document.createElement("input")
  const startGameButton = document.createElement("button");

  //set attributes to dom
  startForm.classList.add("name-form");
  nameInput1.setAttribute("type", "text");
  nameInput1.classList.add("name-input");
  nameInput2.setAttribute("type", "text");
  nameInput2.classList.add("name-input");
  startGameButton.setAttribute("id", "start-game");
  startGameButton.setAttribute("type", "button");

  //add event listeners
  startGameButton.addEventListener("click", startGame)

  //createform
  startForm.appendChild(nameInput1);
  startForm.appendChild(nameInput2);
  startForm.appendChild(startGameButton);
  boardContainer.appendChild(startForm);

  const Player = (name, symbol) => {
    let winner = false
    return {name, symbol, winner}
  };  
};

/*
player object 

name: 
symbol: 

*/


