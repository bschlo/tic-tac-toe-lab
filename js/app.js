//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

let board = "";
let turn = "";
let winner = "";
let tie = "";

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");

const init = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
};

const render = () => {
  updateBoard();
  updateMessage();
};

const updateBoard = () => {
  board.forEach((box, index) => {
    const square = squareEls[index];

    if (box === "X") {
      square.innerText = "X";
    } else if (box === "O") {
      square.innerText = "O";
    } else {
      square.innerText = "";
    }
  });
};

const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.innerText = `It is ${turn} turn.`;
  } else if (winner === false && tie === true) {
    messageEl.innerText = "Tie";
  } else {
    messageEl.innerText = `Player ${turn} wins.`;
  }
};

init();

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleClick = (event) => {
  const squareIndex = event.target.id;
  //check for winner for every click user those
  //update the cell with the players turn
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};

squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});

const placePiece = (index) => {
  board[index] = turn;
};

const checkForWinner = () => {
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;

    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
    }
    if (winner) {
    }
  });
};

const checkForTie = () => {
  if (winner) return;
  /// Chat GPT helped me with this...to be discussed why this is the case
  tie = !board.includes("");
};

const switchPlayerTurn = () => {
  if (winner) {
    return;
  } else {
    if (turn === "X") {
      turn = "O";
    } else if (turn === "O") {
      turn = "X";
    }
  }
};

resetBtnEl.addEventListener("click", init);
