// ---------- Global Variables ----------
var playBtn = document.querySelector(".play-button");
var navBar = document.querySelector(".top-nav");
var formContainer = document.querySelector(".player-input-form");
var directions = document.querySelector(".directions");

// ---------- Event Listeners ----------
playBtn.addEventListener("click", showDirections)

// ---------- Helper Functions ----------



function showDirections(event) {
  event.preventDefault();
  formContainer.classList.add("hidden");
  directions.classList.remove("hidden");
}
