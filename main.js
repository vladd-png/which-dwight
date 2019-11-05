// ---------- Global Variables ----------
var cards = document.querySelectorAll(".single-card");
var cardsBoard = document.querySelector(".playing-cards-board");
var disableBoard = false;
var directions = document.querySelector(".directions");
var errorMsg = document.querySelector(".play-button");
var firstInput = document.querySelector("#one-name");
var flippedCardOver = false;
var formContainer = document.querySelector(".player-input-form");
var gameBoard = document.querySelector(".game-board");
var headerDwight = document.querySelector(".header");
var leftColumn = document.querySelector(".player-left");
var leftHeaderName = document.querySelector(".left-header-name");
var navBar = document.querySelector(".top-nav");
var playBtn = document.querySelector(".play-button");
var playerOneName = document.getElementById("player-one");
var playerTwoName = document.getElementById("player-two");
var rightColumn = document.querySelector(".player-right");
var rightHeaderName = document.querySelector(".right-header-name");
var secondInput = document.querySelector("#two-name");
var startGameBtn = document.querySelector("#start-game");
var storedCards = [];
var turnCounter = 0;

var endOfGame = document.querySelector(".game-ends-section");
var rematchGame = document.querySelector(".reset-cards");
var newGame = document.querySelector(".reset-board");

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
  // deck.shuffle(deck.cards);
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
  showCards();
}

function enablePlayBtn(event) {
  event.preventDefault();
  if (firstInput.value === "") {
    //add an error message
  } else {
    errorMsg.classList.remove("disabled-color");
    playBtn.classList.remove("disabled");
  }
}

// ---------- Player Information ----------
function saveName() {
  var oneName = document.querySelector(".player-one-name").value.toUpperCase();
  leftHeaderName.innerText = oneName;
  playerOneName.innerText = oneName;
  var twoName = document.querySelector(".player-two-name").value.toUpperCase();
  rightHeaderName.innerText = twoName;
  playerTwoName.innerText = twoName;
}

// ---------- Card Creation ----------
function showCards() {
  for (var i = 0; i < 3; i++) {
    document.querySelector(".a").innerHTML +=
    `<div class="single-card" data-number="${deck.cards[i].idNumber}">
      <img class="front-face" src="${deck.cards[i].imgSource}">
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }
  for (var i = 3; i < 7; i++) {
    document.querySelector(".b").innerHTML +=
    `<div class="single-card" data-number="${deck.cards[i].idNumber}">
      <img class="front-face" src="${deck.cards[i].imgSource}">
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }
  for (var i = 7; i <= 9; i++) {
    document.querySelector(".c").innerHTML +=
    `<div class="single-card" data-number="${deck.cards[i].idNumber}">
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
  //forEach is an array prototype
  //executes a provided function once for each array element
});

function flipCard() {
  turnCounter++;
  var selectedCard = event.target.parentElement;
  selectedCard.classList.add("flippedOver");
  selectedCard.classList.add("flip");
  storedCards.push(selectedCard);
  if(storedCards.length === 2) {
    disableBoard = true;
    deck.checkForMatch();
  }
}

function playersTurn() {
  if(secondInput.value !== "") {
    if(turnCounter % 4 === 0) {
      leftColumn.classList.add("player-active");
      rightColumn.classList.remove("player-active");
    } else {
      rightColumn.classList.add("player-active");
      leftColumn.classList.remove("player-active");
    }
  }
}

function resetDeck() {
  storedCards = [];
  disableBoard = false;
  playersTurn();
}


// ---------- Reset the Game ----------
 function showWinner() {
   endOfGame.classList.remove("hidden");
   endOfGame.classList.add("game-ends");
 }

 function resetGame() {
   endOfGame.innerHTML = ``;
   returnHome();
 }

 function resetCards() {
   endOfGame.classList.add("hidden");
   endOfGame.classList.remove("game-ends");
   removeCards();
   startGame();
 }
