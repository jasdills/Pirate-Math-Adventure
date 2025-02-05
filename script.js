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
let character, message, gameContainer, treasure, treasureSound;

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    character = document.getElementById("character");
    message = document.getElementById("message");
    gameContainer = document.querySelector(".game-container");
    treasure = document.getElementById("treasure");
    treasureSound = document.getElementById("treasure-sound");

    if (!character || !treasure || !treasureSound) {
        console.error("Error: One or more elements not found. Check HTML structure.");
    } else {
        newProblem();
    }

    // Allow sound play on first user interaction (fixes browser autoplay issue)
    document.addEventListener("click", () => {
        treasureSound.play().catch(error => console.log("Sound error (first click):", error));
    }, { once: true });
});

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
        characterPosition += 150;
        character.style.left = characterPosition + "px";
        
        let treasurePosition = treasure.offsetLeft - 80; // Ensure correct alignment
        if (characterPosition >= treasurePosition) { 
            character.style.left = treasurePosition + "px"; 
            message.textContent = "🎉 You found the treasure! 🎉";
            
            // Ensure sound plays properly
            treasureSound.currentTime = 0; 
            treasureSound.play().catch(error => console.log("Sound error:", error));
            
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



