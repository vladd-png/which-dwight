class Deck {
  constructor(card) {
    this.cards = card;
    this.matchedCards = null;
    this.selectedCards = null;
    this.matches = 0;
    this.value = card.value;
  }

shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

  disableCards(event) {
    this.matches++;
    var selectedCard = event.target.parentElement;
    setTimeout(fadeOut, 1000);
    function fadeOut() {
      storedCards[0].classList.add("fade");
      storedCards[1].classList.add("fade");
      resetDeck();
    }
    if(this.matches % 5 === 0) {
      showWinner();
    }
  }

  unflipCards(event) {
    disableBoard = true;
    setTimeout(resetCardAnimation, 1500);
    function resetCardAnimation() {
      storedCards[0].classList.remove("flip");
      storedCards[1].classList.remove("flip");
      disableBoard = false;
      resetDeck();
    }
  }

  checkForMatch(card) {
    if (storedCards[0].dataset.number === storedCards[1].dataset.number) {
      flippedCardOver = true;
      this.disableCards(event);
      //match count increase
    } else {
      this.unflipCards(event);
    }
  }
}
