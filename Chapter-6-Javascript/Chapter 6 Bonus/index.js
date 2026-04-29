// Select HTML elements
const rgbValue = document.getElementById("rgb-value");
const colourOptions = document.getElementById("colour-options");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
const replayBtn = document.getElementById("replay-btn");

// Game variables
let lives = 5;
let score = 0;
let correctColour = "";

// Generate random number from 0 to 255
function randomNumber() {
  return Math.floor(Math.random() * 256);
}

// Create a random RGB colour
function generateColour() {
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}

// Start a new round
function newRound() {
  // Clear old colour boxes
  colourOptions.innerHTML = "";

  // Create correct colour
  correctColour = generateColour();

  // Display RGB value for the player to guess
  rgbValue.textContent = correctColour;

  // Create colour options array
  let colours = [
    correctColour,
    generateColour(),
    generateColour()
  ];

  // Shuffle colour options
  colours.sort(() => Math.random() - 0.5);

  // Create colour boxes
  colours.forEach(function(colour) {
    const box = document.createElement("div");

    // Add class and background colour
    box.classList.add("colour-box");
    box.style.backgroundColor = colour;

    // Add click event
    box.addEventListener("click", function() {
      checkAnswer(colour);
    });

    // Add box to page
    colourOptions.appendChild(box);
  });
}

// Check if user selected correct colour
function checkAnswer(selectedColour) {
  // If correct answer
  if (selectedColour === correctColour) {
    score++;
    scoreDisplay.textContent = score;
    message.textContent = "Correct! Well done!";
    newRound();
  } 
  // If wrong answer
  else {
    lives--;
    livesDisplay.textContent = lives;
    message.textContent = "Incorrect! Try again.";

    // Check if game is over
    if (lives === 0) {
      endGame();
    }
  }
}

// End the game
function endGame() {
  rgbValue.textContent = "Game Over";
  colourOptions.innerHTML = "";
  message.textContent = `Final Score: ${score}`;

  // Show replay button
  replayBtn.style.display = "inline-block";
}

// Restart the game
function restartGame() {
  lives = 5;
  score = 0;

  livesDisplay.textContent = lives;
  scoreDisplay.textContent = score;
  message.textContent = "Choose a colour!";
  replayBtn.style.display = "none";

  newRound();
}

// Replay button click event
replayBtn.addEventListener("click", restartGame);

// Start game when page loads
newRound();