// Select HTML elements
const rgbValue = document.getElementById("rgb-value");
const colourOptions = document.getElementById("colour-options");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
const replayBtn = document.getElementById("replay-btn");


let lives = 5;
let score = 0;
let correctColour = "";


function randomNumber() {
  return Math.floor(Math.random() * 256);
}


function generateColour() {
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}


function newRound() {
  
  colourOptions.innerHTML = "";

  
  correctColour = generateColour();

  
  rgbValue.textContent = correctColour;

  
  let colours = [
    correctColour,
    generateColour(),
    generateColour()
  ];

  
  colours.sort(() => Math.random() - 0.5);

  
  colours.forEach(function(colour) {
    const box = document.createElement("div");

    
    box.classList.add("colour-box");
    box.style.backgroundColor = colour;

    
    box.addEventListener("click", function() {
      checkAnswer(colour);
    });

    
    colourOptions.appendChild(box);
  });
}


function checkAnswer(selectedColour) {
  
  if (selectedColour === correctColour) {
    score++;
    scoreDisplay.textContent = score;
    message.textContent = "Correct! Well done!";
    newRound();
  } 
  
  else {
    lives--;
    livesDisplay.textContent = lives;
    message.textContent = "Incorrect! Try again.";

    
    if (lives === 0) {
      endGame();
    }
  }
}


function endGame() {
  rgbValue.textContent = "Game Over";
  colourOptions.innerHTML = "";
  message.textContent = `Final Score: ${score}`;

  
  replayBtn.style.display = "inline-block";
}


function restartGame() {
  lives = 5;
  score = 0;

  livesDisplay.textContent = lives;
  scoreDisplay.textContent = score;
  message.textContent = "Choose a colour!";
  replayBtn.style.display = "none";

  newRound();
}


replayBtn.addEventListener("click", restartGame);


newRound();