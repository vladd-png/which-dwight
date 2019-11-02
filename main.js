// ---------- Global Variables ----------
var playBtn = document.querySelector(".play-button");
var navBar = document.querySelector(".top-nav");
var formContainer = document.querySelector(".player-input-form");
var directions = document.querySelector(".directions");
var headerDwight = document.querySelector(".header");
var startGameBtn = document.querySelector("#start-game");
var gameBoard = document.querySelector(".game-board");
var cardsBoard = document.querySelector(".playing-cards-board");
var firstInput = document.querySelector("#one-name");
var secondInput = document.querySelector("#two-name");
var leftHeaderName = document.querySelector(".left-header-name");
var rightHeaderName = document.querySelector(".right-header-name");
var playerOneName = document.getElementById("player-one");
var playerTwoName = document.getElementById("player-two");
// var playerName = "";

// ---------- Event Listeners ----------
playBtn.addEventListener("click", showDirections);
headerDwight.addEventListener("click", returnHome);
startGameBtn.addEventListener("click", startGame);
firstInput.addEventListener("keyup", enablePlayBtn);
secondInput.addEventListener("keyup", enablePlayBtn);
playBtn.addEventListener("click", saveName);


// ---------- Helper Functions ----------
// function saveName (event) {
//   playerName = event.target.id;
//   // activityName = event.target.value;
//   // clearActivityButtons();
//   event.target.classList.toggle(`player-${playerName}-name`);
// }


// ---------- Other Functions ----------


function returnHome() {
  formContainer.classList.remove("hidden");
  formContainer.reset();
  directions.classList.add("hidden");
  gameBoard.classList.add("hidden");
  cardsBoard.classList.add("hidden");
}

function showDirections(event) {
  event.preventDefault();
  formContainer.classList.add("hidden");
  directions.classList.remove("hidden");
}

function startGame() {
  directions.classList.add("hidden");
  gameBoard.classList.remove("hidden");
  cardsBoard.classList.remove("hidden");
}

function enablePlayBtn(event) {
  event.preventDefault();
  if (firstInput.value === "" || secondInput.value === "") {
    console.log("locked");
  } else {
    playBtn.classList.remove("disabled");
  }
  
function saveName() {
  var oneName = document.querySelector(".player-one-name").value;
  leftHeaderName.innerText = oneName;
  playerOneName.innerText = oneName;
  var twoName = document.querySelector(".player-two-name").value;
  rightHeaderName.innerText = twoName;
  playerTwoName.innerText = twoName;
}
