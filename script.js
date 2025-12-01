
const words = ["UNIVERSITY", "STUDENT", "JAVASCRIPT", 
    "LAPTOP", "PROGRAMMING", "INTERNET", "TEACHER", "DOCUMENT", 
    "PHP", "CSS", "CODE", "NOTEPAD", "LESSON"];

let selectedWord = ""; 
let guessedLetters = [];
let attempts = 6;

const wordDisplay = document.getElementById("wordDisplay");
const keyboardDiv = document.getElementById("keyboard");
const livesDiv = document.getElementById("lives");
const messageDiv = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    guessedLetters = [];
    attempts = 6;
    messageDiv.textContent = "";
    messageDiv.style.color = "black";
    restartBtn.style.display = "none";

    updateWordDisplay();
    updateLives();
    createKeyboard();
}

function updateWordDisplay() {
    const displayArray = selectedWord.split("").map(letter => {
        if (guessedLetters.includes(letter)) { return letter; 
        }else  return "_";
    });

    wordDisplay.textContent = displayArray.join(" ");

    if (!wordDisplay.textContent.includes("_")) endGame(true);
}

function createKeyboard() {
    keyboardDiv.innerHTML = "";
    
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.classList.add("letter-btn");
        
        btn.addEventListener("click", () => handleGuess(letter, btn));
        
        keyboardDiv.appendChild(btn);
    }
}

function handleGuess(letter, btnElement) {
    btnElement.disabled = true;
    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        btnElement.classList.add("correct!");
        updateWordDisplay();
    } else {
        btnElement.classList.add("wrong!");
        attempts--;
        updateLives();
        
        if (attempts === 0) endGame(false);
    }
}

function updateLives() {
    livesDiv.textContent = `Залишилось спроб: ${attempts}`;
}

function endGame(isWin) {
    const buttons = document.querySelectorAll(".letter-btn");
    buttons.forEach(btn => btn.disabled = true);

    if (isWin) {
        messageDiv.textContent = "Вітаємо! Ви виграли!";
        messageDiv.style.color = "green";
    } else {
        messageDiv.textContent = `Ви програли. Слово було: ${selectedWord}`;
        messageDiv.style.color = "red";
    }
    
    restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", initGame);

initGame();