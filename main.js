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
var cards = document.querySelectorAll(".single-card");
var flippedCardOver = false;
var disableBoard = false;
var firstCard, secondCard;
var storedDeckOfCards = [];
var card1 = new Card({idNumber: 1, "./assets/hannibal-dwight.png"});
var card2 = new Card({idNumber: 2, "./assets/joker-dwight.png"});
var card3 = new Card({idNumber: 3, "./assets/jim-dwight.png"});
var card4 = new Card({idNumber: 4, "./assets/meredith-dwight.png"});
var card5 = new Card({idNumber: 5, "./assets/kerrigan-dwight.png"});
// var playerName = "";

// ---------- Event Listeners ----------
playBtn.addEventListener("click", savePlayerInfo);
headerDwight.addEventListener("click", returnHome);
startGameBtn.addEventListener("click", startGame);
firstInput.addEventListener("keyup", enablePlayBtn);
secondInput.addEventListener("keyup", enablePlayBtn);


// ---------- Helper Functions ----------

function savePlayerInfo(event) {
  showDirections(event);
  saveName();
}

// function saveName (event) {
//   playerName = event.target.id;
//   // activityName = event.target.value;
//   // clearActivityButtons();
//   event.target.classList.toggle(`player-${playerName}`);
// }

// ---------- Page Changes ----------
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
  if (firstInput.value === "") {
  } else {
    playBtn.classList.remove("disabled");
  }
}
// ---------- Player Information ----------
function saveName() {
  var oneName = document.querySelector(".player-one-name").value;
  leftHeaderName.innerText = oneName;
  playerOneName.innerText = oneName;
  var twoName = document.querySelector(".player-two-name").value;
  rightHeaderName.innerText = twoName;
  playerTwoName.innerText = twoName;
}

// ---------- Card Flip Animation ----------
cards.forEach(function(card) {
  card.addEventListener("click", flipCard);
  //foreach is an array prototype
  //executes a provided function once for each array element
});

function flipCard() {
  //this = the element that is clicked - each card
  if (disableBoard || this === firstCard) {
    return;
  }
  this.classList.add("flip");
  if (!flippedCardOver) {
    flippedCardOver = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.number === secondCard.dataset.number) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  setTimeout(fadeOut, 1000);
  function fadeOut() {
    firstCard.classList.add("fade");
    secondCard.classList.add("fade");
    resetStoredCard();
  }
}

function unflipCards() {
  disableBoard = true;
  setTimeout(resetCardAnimation, 1500);
  function resetCardAnimation() {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    disableBoard = false;
    resetStoredCard();
  }
}

function resetStoredCard() {
  flippedCardOver = false;
  disableBoard = false;
  firstCard = null;
  secondCard = null;
}



// ---------- Card Flip Animation ----------
