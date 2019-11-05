// ---------- Global Variables ----------
var activeLeft = document.querySelector(".active-left");
var activeRight = document.querySelector(".active-right");
var cards = document.querySelectorAll(".single-card");
var cardsBoard = document.querySelector(".playing-cards-board");
var directions = document.querySelector(".directions");
var endOfGame = document.querySelector(".game-ends-section");
var disableBoard = false;
var endTime = null;
var errorMsg = document.querySelector(".play-button");
var firstInput = document.querySelector("#one-name");
var flippedCardOver = false;
var formContainer = document.querySelector(".player-input-form");
var gameBoard = document.querySelector(".game-board");
var headerDwight = document.querySelector(".header");
var leftColumn = document.querySelector(".player-left");
var leftHeaderName = document.querySelector(".left-header-name");
var navBar = document.querySelector(".top-nav");
var newGame = document.querySelector(".reset-board");
var oneName = document.querySelector(".player-one-name").value;
var playBtn = document.querySelector(".play-button");
var playerLeftCount = 0;
var playerRightCount = 0;
var playerOneName = document.getElementById("player-one");
var players = [];
var playerTwoName = document.getElementById("player-two");
var rematchGame = document.querySelector(".reset-cards");
var rightColumn = document.querySelector(".player-right");
var rightHeaderName = document.querySelector(".right-header-name");
var roundOneLeft = document.querySelector(".win-1-left");
var roundThreeLeft = document.querySelector(".win-3-left");
var roundTwoLeft = document.querySelector(".win-2-left");
var roundOneRight = document.querySelector(".win-1-right");
var roundThreeRight = document.querySelector(".win-3-right");
var roundTwoRight = document.querySelector(".win-2-right");
var score = [];
var secondInput = document.querySelector("#two-name");
var skewPile = ['right', 'left', 'large', 'small'];
var startGameBtn = document.querySelector("#start-game");
var startTime = null;
var storedCards = [];
var timer = document.querySelector(".timer-insert");
var totalTime = null;
var twoName = document.querySelector(".player-two-name").value;
var turnCounter = 0;
var winner = document.querySelector("#winner");

var heroMenu = document.querySelector("#menu-icon")

// ---------- Class Instantiations ----------
var card1 = new Card({idNumber: 1, imgSource: "./assets/hannibal-dwight.png"});
var card2 = new Card({idNumber: 2, imgSource: "./assets/joker-dwight.png"});
var card3 = new Card({idNumber: 3, imgSource: "./assets/jim-dwight.png"});
var card4 = new Card({idNumber: 4, imgSource: "./assets/meredith-dwight.png"});
var card5 = new Card({idNumber: 5, imgSource: "./assets/kerrigan-dwight.png"});
var card6 = new Card({idNumber: 1, imgSource: "./assets/hannibal-dwight.png"});
var card7 = new Card({idNumber: 2, imgSource: "./assets/joker-dwight.png"});
var card8 = new Card({idNumber: 3, imgSource: "./assets/jim-dwight.png"});
var card9 = new Card({idNumber: 4, imgSource: "./assets/meredith-dwight.png"});
var card10 = new Card({idNumber: 5, imgSource: "./assets/kerrigan-dwight.png"});
var deck = new Deck([card1, card2, card3, card4, card5, card6, card7, card8, card9, card10]);

// ---------- Event Listeners ----------
playBtn.addEventListener("click", savePlayerInfo);
headerDwight.addEventListener("click", returnHome);
startGameBtn.addEventListener("click", startGame);
firstInput.addEventListener("keyup", enablePlayBtn);
secondInput.addEventListener("keyup", enablePlayBtn);
newGame.addEventListener("click", resetGame);
rematchGame.addEventListener("click", resetCards);
heroMenu.addEventListener("click", getData);

// ---------- Helper Functions ----------
function savePlayerInfo(event) {
  showDirections(event);
  saveName();
}

function startGame() {
  loadBoard();
  skewCards();
  showCards();
  startTimer();
}

function resetCards() {
  endGame();
  removeCards();
  startGame();
  activeLeft.classList.remove("hidden");
  leftColumn.classList.add("player-active");
}

function resetGame() {
  endGame();
  disablePlayBtn();
  returnHome();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// ---------- Page Changes ----------
function returnHome() {
  formContainer.classList.remove("hidden");
  formContainer.reset();
  removeCards();
  directions.classList.add("hidden");
  gameBoard.classList.add("hidden");
  cardsBoard.classList.add("hidden");
}

function showDirections(event) {
  event.preventDefault();
  formContainer.classList.add("hidden");
  directions.classList.remove("hidden");
}

function loadBoard() {
  directions.classList.add("hidden");
  gameBoard.classList.remove("hidden");
  cardsBoard.classList.remove("hidden");
  deck.shuffle(deck.cards);
}

function enablePlayBtn(event) {
  event.preventDefault();
  if (firstInput.value === "") {
  } else {
    errorMsg.classList.remove("disabled-color");
    playBtn.classList.remove("disabled");
  }
}

function disablePlayBtn() {
  errorMsg.classList.add("disabled-color");
  playBtn.classList.add("disabled");
}

// ---------- Player Information ----------
function saveName() {
  var oneName = document.querySelector(".player-one-name").value.toUpperCase();
  leftHeaderName.innerText = oneName;
  playerOneName.innerText = oneName;
  players.push(oneName);
  winner.innerText = `${oneName} HAS WON`;
  var twoName = document.querySelector(".player-two-name").value.toUpperCase();
  rightHeaderName.innerText = twoName;
  playerTwoName.innerText = twoName;
  players.push(twoName);
  winner.innerText = `${twoName} HAS WON`;
}

// ---------- Card Creation ----------
function skewCards() {
  var randomNum = getRandomInt(4);
  skewData = skewPile[randomNum];
}

function showCards() {
  for (var i = 0; i < 3; i++) {
    skewCards();
    document.querySelector(".top").innerHTML +=
    `<div class="single-card skew-${skewData}" data-number="${deck.cards[i].idNumber}">
      <img class="front-face" src="${deck.cards[i].imgSource}">
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }

  for (var i = 3; i < 7; i++) {
    skewCards();
    document.querySelector(".middle").innerHTML +=
    `<div class="single-card skew-${skewData}" data-number="${deck.cards[i].idNumber}">
      <img class="front-face" src="${deck.cards[i].imgSource}">
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }

  for (var i = 7; i <= 9; i++) {
    skewCards();
    document.querySelector(".bottom").innerHTML +=
    `<div class="single-card skew-${skewData}" data-number="${deck.cards[i].idNumber}">
      <img class="front-face" src="${deck.cards[i].imgSource}">
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }
}

function removeCards() {
  document.querySelector(".a").innerHTML = ``;
  document.querySelector(".b").innerHTML = ``;
  document.querySelector(".c").innerHTML = ``;
}

// ---------- Card Flip Animation ----------
cards.forEach(function(card) {
  card.addEventListener("click", flipCard);
});

function flipCard() {
  turnCounter++;
  var selectedCard = event.target.parentElement;
  selectedCard.classList.add("flippedOver");
  selectedCard.classList.add("flip");
  storedCards.push(selectedCard);
  if(storedCards.length === 2) {
    cardsBoard.classList.add("no-click");
    deck.checkForMatch();
  }
}

function playersTurn() {
  if(secondInput.value !== "") {
    if(turnCounter % 4 === 0) {
      leftColumn.classList.add("player-active");
      rightColumn.classList.remove("player-active");
      activeLeft.classList.remove("hidden");
      activeRight.classList.add("hidden");
    } else {
      rightColumn.classList.add("player-active");
      leftColumn.classList.remove("player-active");
      activeRight.classList.remove("hidden");
      activeLeft.classList.add("hidden");
    }
  }
}

function resetDeck() {
  storedCards = [];
  playersTurn();
  cardsBoard.classList.remove("no-click");
}

// ---------- Player Data ----------
function showWinner() {
  saveData();
  endTimer();
  logTime();
  playerRightCount = 0;
  playerLeftCount = 0;
  endOfGame.classList.remove("hidden");
  endOfGame.classList.add("game-ends");
  activeLeft.classList.add("hidden");
  activeRight.classList.add("hidden");
  leftColumn.classList.remove("player-active");
  rightColumn.classList.remove("player-active");
  timer.innerHTML = `
  <div class="timer">In ${totalTime} Seconds!</div>
  `;
}

function checkScore() {
  if (playerLeftCount > playerRightCount) {
    return true;
  } else {
    return false;
  }
}

function startTimer() {
  startTime = Date.now();
}

function endTimer() {
  endTime = Date.now();
}

function logTime() {
  totalTime = (Math.floor(Math.floor(endTime - startTime) * 0.001));
}

function showCountRight() {
  leftMatch = document.querySelector(".matches-left");
  leftMatch.innerHTML = `<div class="match-title">${playerRightCount}<div>`;
}

function showCountLeft() {
  rightMatch = document.querySelector(".matches-right");
  rightMatch.innerHTML = `<div class="match-title">${playerLeftCount}<div>`;
}

// ---------- End of Game ----------
function saveData() {
  var storedPlayer = [];
  var storedScore = [];
  storedScore.push(score);
  storedPlayer.push(players);
  var stringifiedPlayer = JSON.stringify(storedPlayer);
  var stringifiedScore = JSON.stringify(storedScore);
  localStorage.setItem('score', stringifiedScore);
  localStorage.setItem('players', stringifiedPlayer);
}

function getData() {
  var retrievedPlayers = localStorage.getItem(players);
  var playerOutput = JSON.parse(retrievedPlayers);
  console.log(playerOutput);
}

 function endGame() {
   endOfGame.classList.add("hidden");
   endOfGame.classList.remove("game-ends");
   endOfGame.innerHTML = ``;
 }
