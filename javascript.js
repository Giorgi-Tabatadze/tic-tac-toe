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

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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

const boardContainer = document.querySelector(".board-container");
const uiContainer = document.querySelector("#ui-container");





const displayController = function (plr1, plr2, aiGame){
  //cache players
  player1 = plr1;
  player2 = plr2;

  let playerTurn = player1;
  let rep = 0;
  let winnerDetermined = false;
  let message = "";
  let aiStatus = aiGame;

  const renderBoard = function () {
    removeAllChildNodes(boardContainer);
    boardContainer.classList.add("bigger");
    gameBoard.grid.forEach(element => {
      let square = document.createElement("div");
      square.dataset.id = gameBoard.grid.indexOf(element);
      square.classList.add("square")
      square.classList.add("big-square")
      if (typeof element === "number"){
        if (winnerDetermined === false){
        square.addEventListener("click", getLocation);
        }
      }
      else {
        square.innerText = element;
        if (element === "X") {
          square.classList.add("x")
        }
        else {
          square.classList.add("o")
        }
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
  
  const getLocation = (event) => {
    let location;
    let symbol;

    if (aiStatus && playerTurn === player2) {
      location = aiMove()
    }
    else {
    location = event.target.dataset.id;
    }
    symbol = playerTurn.symbol;

    moveMade(location,symbol);
  }


  const moveMade = function(location, symbol) {
    gameBoard.putSymbol(location, symbol);
    rep += 1;
    checkWin ();
    renderBoard();
    if (winnerDetermined){
      gameEnd();
      return;
    }
    changeTurn();
    if (aiStatus){
    getLocation();
    };
  };

  const aiMove = () => {
    let index;
    do {
      index = randomIntFromInterval(0, 8);
      if (typeof gameBoard.grid[index] === "number"){
        return index;
      };
    }
    while (typeof gameBoard.grid[index] !== "number")
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
        player1.timesWon += 1;
        message = `${player1.name} is the winner`;
        winnerDetermined = true;
        //message
      }
      else {
        player2.timesWon += 1;
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
  displayWinCount();
  };
  
  const displayWinCount = () => {
    let message = document.createElement("h3");
    message.innerText = `${player1.name}: ${player1.timesWon}  ${player2.name}: ${player2.timesWon}`
    uiContainer.appendChild(message);
  }
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
    playAgainBtn.innerText = "Next Round"
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
  displayWinCount();
  renderBoard();
};



const displayForm = () => {

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
  const startForm = document.createElement("form");
  const nameInput1 = document.createElement("input");
  const nameInput1Label = document.createElement("label");
  const nameInput1Div = document.createElement("div");
  const nameInput2 = document.createElement("input");
  const nameInput2Label = document.createElement("label");
  const startGameButton = document.createElement("button");
  const nameInput2Div = document.createElement("div");

  //set attributes to dom
  startForm.classList.add("name-form");

  nameInput1.setAttribute("type", "text");
  nameInput1.setAttribute("id", "name-input-1");
  nameInput1Label.setAttribute("id", "name-input-1");
  nameInput1Label.innerText = "X Player Name: "
  nameInput1Div.classList.add("name-input")

  nameInput2.setAttribute("type", "text");
  nameInput2.setAttribute("id", "name-input-2");
  nameInput2Label.setAttribute("id", "name-input-2");
  nameInput2Label.innerText = "O Player Name: "
  nameInput2Div.classList.add("name-input")

  startGameButton.setAttribute("id", "start-game");
  startGameButton.setAttribute("type", "button");
  startGameButton.innerText = "Start Game"

  //add event listeners
  startGameButton.addEventListener("click", startGame)

  //createform
  removeAllChildNodes(uiContainer);
  nameInput1Div.appendChild(nameInput1Label);
  nameInput1Div.appendChild(nameInput1);
  nameInput2Div.appendChild(nameInput2Label);
  nameInput2Div.appendChild(nameInput2);
  startForm.appendChild(nameInput1Div);
  startForm.appendChild(nameInput2Div);
  startForm.appendChild(startGameButton);
  uiContainer.appendChild(startForm);
};

let player1;
let player2;

const Player = (name, symbol) => {
  let timesWon = 0;
  return {name, symbol, timesWon}
};


const newGame = (() => {
  const playerVsPlayer = document.getElementById("player-player");
  const playerVsAi = document.getElementById("player-ai");

  const startAiGame = () => {
    player1 = Player("Human", "X")
    player2 = Player("AI", "O")

    removeAllChildNodes(uiContainer);
    displayController(player1, player2, true)
  }
  playerVsPlayer.addEventListener("click", displayForm);
  playerVsAi.addEventListener("click", startAiGame)
})();


/*
player object 

name: 
symbol: 

*/


