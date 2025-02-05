// Math problems for the game (200+ problems)
const problems = [];

// Generate 100 addition problems
for (let i = 0; i < 100; i++) {
    let num1 = Math.floor(Math.random() * 50) + 1;
    let num2 = Math.floor(Math.random() * 50) + 1;
    problems.push({ question: `${num1} + ${num2} =`, answer: num1 + num2 });
}

// Generate 100 subtraction problems
for (let i = 0; i < 100; i++) {
    let num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * num1) + 1; // Ensures no negative numbers
    problems.push({ question: `${num1} - ${num2} =`, answer: num1 - num2 });
}

let currentProblem = {};
let characterPosition = 10;
const character = document.getElementById("character");
const message = document.getElementById("message");
const gameContainer = document.querySelector(".game-container");

// Load and play treasure sound
const treasureSound = new Audio("treasure.mp3");

treasureSound.preload = "auto";

treasureSound.volume = 0.8;

// Function to generate a new problem
function newProblem() {
    currentProblem = problems[Math.floor(Math.random() * problems.length)];
    document.getElementById("question").textContent = currentProblem.question;
    document.getElementById("answer").value = "";
    document.getElementById("message").textContent = "";
}

// Function to check the player's answer
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value;
    if (parseInt(userAnswer) === currentProblem.answer) {
        characterPosition += 100;
        character.style.left = characterPosition + "px";
        
        if (characterPosition >= 700) { // Adjusted for full reach
            character.style.left = "700px"; // Ensure full reach
            message.textContent = "🎉 You found the treasure! 🎉";
            treasureSound.play();
            character.style.animation = "jump 0.5s infinite alternate";
            showRestartButton();
        } else {
            newProblem();
        }
    } else {
        message.textContent = "❌ Try again!";
    }
}

// Function to show restart button
function showRestartButton() {
    let restartButton = document.createElement("button");
    restartButton.textContent = "Play Again";
    restartButton.classList.add("restart-button");
    restartButton.onclick = resetGame;
    gameContainer.appendChild(restartButton);
}

// Function to reset the game
function resetGame() {
    characterPosition = 10;
    character.style.left = characterPosition + "px";
    message.textContent = "";
    document.querySelector(".restart-button").remove();
    newProblem();
}

// Initialize the game after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    newProblem();
});

