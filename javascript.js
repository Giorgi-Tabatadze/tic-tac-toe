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

const gameBoard = function () {
  let grid = [0, 1, 2, 
              3, 4, 5, 
              6, 7, 8];

  const putSymbol = function(location, symbol) {
    gameBoard.grid[location] = symbol;
    //nextTurn();
  };

  const clearBoard = () => {
    gameBoard.grid = [0, 1, 2, 
                    3, 4, 5, 
                    6, 7, 8];
  }

  return {grid, putSymbol, clearBoard}
}();



const displayController = function (plr1, plr2){
  //cache players
  player1 = plr1;
  player2 = plr2;

  let playerTurn = player1;
  let rep = 0;
  let winnerDetermined = false;
  let message = "";

  const boardContainer = document.querySelector("#board-container");
  const uiContainer = document.querySelector("#ui-container");

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
    if (winnerDetermined){
      gameEnd();
      return;
    }
    changeTurn();
  };

  const checkWin = () => {
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
        message = `${player1.name} is the winner`;
        winnerDetermined = true;
        //message
      }
      else {
        player2.winner = true;
        message = `${player2.name} is the winner`
        winnerDetermined = true;
        //message
      }
    } else if (rep === 9){
      message = `its a draw`
      winnerDetermined = true;
      //draw
    };
  };

  const clearGame = () => {
  playerTurn = player1;
  rep = 0;
  winnerDetermined = false;
  message = "";
  removeAllChildNodes(boardContainer);
  removeAllChildNodes(uiContainer);
  };
  

  const playAgain = () => {
    clearGame();
    gameBoard.clearBoard();
    renderBoard();
  };

  const newPlayers = () => {
    location.reload();
  }

  const gameEnd = () => {
    let messageBoard = document.createElement("h3");
    messageBoard.innerHTML = message;
    let playAgainBtn = document.createElement("button")
    playAgainBtn.setAttribute("id", "play-again");
    playAgainBtn.setAttribute("type", "button");
    playAgainBtn.innerText = "Play Again"
    playAgainBtn.addEventListener("click", playAgain);
    let newPlayersBtn = document.createElement("button")
    newPlayersBtn.setAttribute("id", "new-Players");
    newPlayersBtn.setAttribute("type", "button");
    newPlayersBtn.innerText = "New Players";
    newPlayersBtn.addEventListener("click", newPlayers);
    uiContainer.appendChild(messageBoard);
    uiContainer.appendChild(playAgainBtn);
    uiContainer.appendChild(newPlayersBtn);
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
    removeAllChildNodes(uiContainer);
    displayController(player1, player2);
    };
  };

  //cache DOM
  const uiContainer = document.querySelector("#ui-container");
  const startForm = document.createElement("form");
  const nameInput1 = document.createElement("input")
  const nameInput1Label = document.createElement("label")
  const nameInput2 = document.createElement("input")
  const nameInput2Label = document.createElement("label")
  const startGameButton = document.createElement("button");

  //set attributes to dom
  startForm.classList.add("name-form");

  nameInput1.setAttribute("type", "text");
  nameInput1.setAttribute("id", "name-input-1");
  nameInput1Label.setAttribute("id", "name-input-1");
  nameInput1Label.innerText = "X Player Name"
  nameInput1.classList.add("name-input");

  nameInput2.setAttribute("type", "text");
  nameInput2.setAttribute("id", "name-input-2");
  nameInput2Label.setAttribute("id", "name-input-2");
  nameInput2Label.innerText = "O Player Name"
  nameInput2.classList.add("name-input");

  startGameButton.setAttribute("id", "start-game");
  startGameButton.setAttribute("type", "button");
  startGameButton.innerText = "Start Game"

  //add event listeners
  startGameButton.addEventListener("click", startGame)

  //createform
  removeAllChildNodes(uiContainer);
  startForm.appendChild(nameInput1Label);
  startForm.appendChild(nameInput1);
  startForm.appendChild(nameInput2Label);
  startForm.appendChild(nameInput2);
  startForm.appendChild(startGameButton);
  uiContainer.appendChild(startForm);

  const Player = (name, symbol) => {
    let winner = false
    return {name, symbol, winner}
  };    

};

const newGame = (() => {
  const playerVsPlayer = document.getElementById("player-player");
  const playerVsAi = document.getElementById("player-ai");
  playerVsPlayer.addEventListener("click", displayForm);
})();


/*
player object 

name: 
symbol: 

*/


