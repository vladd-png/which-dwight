class Deck {
  constructor(card) {
    this.cards = card;
    this.matchedCards = null;
    this.selectedCards = null;
    this.matches = null;
    this.value = card.value;
  }

  shuffle() {
  }

  disableCards(event) {
    var selectedCard = event.target.parentElement;
    setTimeout(fadeOut, 1000);
    function fadeOut() {
      storedCards[0].classList.add("fade");
      storedCards[1].classList.add("fade");
      resetDeck();
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
