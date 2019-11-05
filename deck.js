class Deck {
  constructor(card) {
    this.cards = card;
    this.matchedCards = 0;
    this.matches = 0;
    this.value = card.value;
  }

  shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempNum = array[i];
        array[i] = array[j];
        array[j] = tempNum;
    }
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
      this.matches = 0;
      score.push(playerLeftCount);
      score.push(playerRightCount);
      showCountRight();
      showCountLeft();
      setTimeout(showWinner, 1500);
    }
  }

  unflipCards(event) {
    setTimeout(resetCardAnimation, 1500);
    function resetCardAnimation() {
      storedCards[0].classList.remove("flip");
      storedCards[1].classList.remove("flip");
      resetDeck();
    }
  }

  checkForMatch(card) {
    if (storedCards[0].dataset.number === storedCards[1].dataset.number) {
      flippedCardOver = true;
      this.disableCards(event);
      this.showMatchCount(event);
      } else {
        this.unflipCards(event);
      }
    }

  showMatchCount() {
    console.log();
    if(turnCounter % 4 === 0) {
      playerLeftCount++;
      showCountLeft();
    } else {
      playerRightCount++;
      showCountRight();
    }
  }
}
