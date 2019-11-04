class Card {
  constructor(idNumber, imgSource) {
    this.idNumber = idNumber;
    this.imgSource = imgSource;
    this.matched = false;
    this.value = null;
  }


  match() {
    this.matched = true;
  }
}
