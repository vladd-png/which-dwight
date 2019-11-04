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
var errorMsg = document.querySelector(".play-button");
var flippedCardOver = false;
var disableBoard = false;
var firstCard, secondCard;
var storedCards = [];
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
//var deck and when you instantiate the deck call all the card objects
var deckOfCards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10]
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
  var oneName = document.querySelector(".player-one-name").value;
  leftHeaderName.innerText = oneName;
  playerOneName.innerText = oneName;
  var twoName = document.querySelector(".player-two-name").value;
  rightHeaderName.innerText = twoName;
  playerTwoName.innerText = twoName;
}

// ---------- Card Creation ----------
function showCards() {
  for (var i = 0; i < 3; i++) {
    document.querySelector(".a").innerHTML +=
    `<div class="single-card" data-number="${deckOfCards[i].idNumber}">
      <img class="front-face" src=${deckOfCards[i].imgSource}>
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }
  for (var i = 3; i < 7; i++) {
    document.querySelector(".b").innerHTML +=
    `<div class="single-card" data-number="${deckOfCards[i].idNumber}">
      <img class="front-face" src=${deckOfCards[i].imgSource}>
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }
  for (var i = 7; i <= 9; i++) {
    document.querySelector(".c").innerHTML +=
    `<div class="single-card" data-number="${deckOfCards[i].idNumber}">
      <img class="front-face" src=${deckOfCards[i].imgSource}>
      <img class="back-face" src="./assets/card-back.png">
    </div>`;
  }
}

  //
  //
  // document.querySelector(".a").innerHTML=
  // `<div class="single-card" data-number="${card1.idNumber}">
  //   <img class="front-face" src=${card1.imgSource}>
  //   <img class="back-face" src="./assets/card-back.png">
  // </div>`;
  //
  // document.querySelector(".b").innerHTML=
  // `<div class="single-card" data-number="${card2.idNumber}">
  //   <img class="front-face" src=${card2.imgSource}>
  //   <img class="back-face" src="./assets/card-back.png">
  // </div>`;
  //
  // document.querySelector(".c").innerHTML=
  // `<div class="single-card" data-number="${card3.idNumber}">
  //   <img class="front-face" src=${card3.imgSource}>
  //   <img class="back-face" src="./assets/card-back.png">
  // </div>`;
  //
  // document.querySelector(".d").innerHTML=
  // `<div class="single-card" data-number="${card4.idNumber}">
  //   <img class="front-face" src=${card4.imgSource}>
  //   <img class="back-face" src="./assets/card-back.png">
  // </div>`;
  //
  // document.querySelector(".e").innerHTML=
  // `<div class="single-card" data-number="${card5.idNumber}">
  //   <img class="front-face" src=${card5.imgSource}>
  //   <img class="back-face" src="./assets/card-back.png">
  // </div>`;
// }




// ---------- Card Flip Animation ----------
cards.forEach(function(card) {
  card.addEventListener("click", flipCard);
  //foreach is an array prototype
  //executes a provided function once for each array element
});

function flipCard() {
  var selectedCard = event.target.parentElement;
  selectedCard.classList.add("flippedOver");
  selectedCard.classList.add("flip");
  storedCards.push(selectedCard);
  if(storedCards.length === 2) {
    disableBoard = true;
    checkForMatch();
  }
}

function checkForMatch() {
  if (storedCards[0].dataset.number === storedCards[1].dataset.number) {
    flippedCardOver = true;
    disableCards(event);
    //match count increase
  } else {
    unflipCards(event);
  }
}

function disableCards(event) {
  var selectedCard = event.target.parentElement;
  setTimeout(fadeOut, 1000);
  function fadeOut() {
    storedCards[0].classList.add("fade");
    storedCards[1].classList.add("fade");
    resetDeck();
  }
}

function unflipCards(event) {
  disableBoard = true;
  setTimeout(resetCardAnimation, 1500);
  function resetCardAnimation() {
    storedCards[0].classList.remove("flip");
    storedCards[1].classList.remove("flip");
    disableBoard = false;
    resetDeck();
  }
}

function resetDeck() {
  storedCards = [];
  disableBoard = false;
}

// ---------- Card Flip Animation ----------
