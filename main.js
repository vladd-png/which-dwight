// ---------- Global Variables ----------
var playBtn = document.querySelector(".play-button");
var navBar = document.querySelector(".top-nav");
var formContainer = document.querySelector(".player-input-form");
var directions = document.querySelector(".directions");
var headerDwight = document.querySelector(".header");
var startGameBtn = document.querySelector("#start-game");
var gameBoard = document.querySelector(".game-board");

// ---------- Event Listeners ----------
playBtn.addEventListener("click", showDirections);
headerDwight.addEventListener("click", returnHome);
startGameBtn.addEventListener("click", startGame);

// ---------- Helper Functions ----------

function returnHome() {
  formContainer.classList.remove("hidden");
  directions.classList.add("hidden");
  // formContainer.classList.add("visible");
}

function showDirections(event) {
  event.preventDefault();
  formContainer.classList.add("hidden");
  directions.classList.remove("hidden");
  // directions.classList.add("visible");
}

function startGame() {
  directions.classList.add("hidden");
  gameBoard.classList.remove("hidden");
  // gameBoard.classList.add("visible");
}
