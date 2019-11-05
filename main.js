// ---------- Global Variables ----------
var activeLeft = document.querySelector(".active-left");
var activeRight = document.querySelector(".active-right");
var cards = document.querySelectorAll(".single-card");
var cardsBoard = document.querySelector(".playing-cards-board");
var disableBoard = false;
var directions = document.querySelector(".directions");
var endOfGame = document.querySelector(".game-ends-section");
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
var playBtn = document.querySelector(".play-button");
var playerOneName = document.getElementById("player-one");
var playerTwoName = document.getElementById("player-two");
var rematchGame = document.querySelector(".reset-cards");
var rightColumn = document.querySelector(".player-right");
var rightHeaderName = document.querySelector(".right-header-name");
var secondInput = document.querySelector("#two-name");
var startGameBtn = document.querySelector("#start-game");
var storedCards = [];
var turnCounter = 0;

var oneName = "";
var twoName = "";

var startTime = null;
var endTime = null;
var totalTime = null;
var timer = document.querySelector(".timer-insert");
var roundOneLeft = document.querySelector(".win-1-left");
var roundTwoLeft = document.querySelector(".win-2-left");
var roundThreeLeft = document.querySelector(".win-3-left");
var roundOneRight = document.querySelector(".win-1-right");
var roundTwoRight = document.querySelector(".win-2-right");
var roundThreeRight = document.querySelector(".win-3-right");
var playerLeftCount = 0;
var playerRightCount = 0;
var skewPile = ['right', 'left', 'large', 'small'];
var winner = document.querySelector("#winner");
var twoName = document.querySelector(".player-two-name").value;
var oneName = document.querySelector(".player-one-name").value;


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

// ---------- Helper Functions ----------
function savePlayerInfo(event) {
  showDirections(event);
  saveName();
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

function startGame() {
  directions.classList.add("hidden");
  gameBoard.classList.remove("hidden");
  cardsBoard.classList.remove("hidden");
  deck.shuffle(deck.cards);
  skewCards();
  showCards();
  startTimer();
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
  winner.innerText = `${oneName} HAS WON`;
  var twoName = document.querySelector(".player-two-name").value.toUpperCase();
  rightHeaderName.innerText = twoName;
  playerTwoName.innerText = twoName;
  winner.innerText = `${twoName} HAS WON`;
}

// ---------- Card Creation ----------

function skewCards() {
  var randomNum = getRandomInt(4);
  skewData = skewPile[randomNum];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function showCards() {
  for (var i = 0; i < 3; i++) {
    skewCards();
    document.querySelector(".a").innerHTML +=
    `<div class="single-card skew-${skewData}" data-number="${deck.cards[i].idNumber}">
      <img class="front-face" src="${deck.cards[i].imgSource}">
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }

  for (var i = 3; i < 7; i++) {
    skewCards();
    document.querySelector(".b").innerHTML +=
    `<div class="single-card skew-${skewData}" data-number="${deck.cards[i].idNumber}">
      <img class="front-face" src="${deck.cards[i].imgSource}">
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }

  for (var i = 7; i <= 9; i++) {
    skewCards();
    document.querySelector(".c").innerHTML +=
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
    disableBoard = true;
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
  disableBoard = false;
  playersTurn();
  cardsBoard.classList.remove("no-click");
}

// ---------- Player Data ----------
function showWinner() {
  endTimer();
  logTime();
  // showWinName();
  endOfGame.classList.remove("hidden");
  endOfGame.classList.add("game-ends");
  timer.innerHTML = `
  <div class="timer">In ${totalTime} Seconds!</div>
  `;
}

// function showWinName() {
//   if(checkScore) {
//     winner.innerText = `${oneName} HAS WON`;
//   } else {
//     winner.innerText = `${twoName} HAS WON`;
//   }
// }

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

// ---------- Reset the Game ----------
 function resetGame() {
   endOfGame.classList.add("hidden");
   endOfGame.classList.remove("game-ends");
   endOfGame.innerHTML = ``;
   deck.playerRightCount = 0;
   deck.playerLeftCount = 0;
   disablePlayBtn();
   returnHome();
 }

 function resetCards() {
   endOfGame.classList.add("hidden");
   endOfGame.classList.remove("game-ends");
   deck.playerRightCount = 0;
   deck.playerLeftCount = 0;
   removeCards();
   startGame();
 }
