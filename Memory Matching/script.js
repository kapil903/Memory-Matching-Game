let playerName = '';
let boardRows = 0;
let boardCols = 0;
let totalCards = 0;
let iconSet = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let moves = 0;
let timer = 0;
let isTimerRunning = false;
let timerInterval;

const ALL_ICONS = [
    '⛰️', '✈️', '🧭', '🛶', '⛺', '🌴', '🗺️', '📸', '🌅',
    '🥾', '🐒', '🦁', '🌊', '🏜️', '🔥', '🗿', '🔭', '🛖'
];

const CHEER_MESSAGES = [
    "A masterful performance! You're a true explorer!",
    "Incredible speed! Your mental compass is sharp!",
    "Every adventure is a success! Ready for the next difficulty?",
    "Well done! The ancient maps are proud of your efficiency!",
    "You navigated that board like a pro! Time for a celebratory feast!"
];

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const gameBoard = document.getElementById('game-board');
const playerNameInput = document.getElementById('player-name-input');
const playerGreeting = document.getElementById('player-greeting');
const movesDisplay = document.querySelector('.moves');
const timerDisplay = document.querySelector('.timer');
const modeButtons = document.querySelectorAll('.mode-btn');
const resetButton = document.querySelector('.reset-btn');
const homeButton = document.querySelector('.home-btn');
const playAgainButton = document.getElementById('play-again-btn');
const resultsTitle = document.getElementById('results-title');
const finalStats = document.getElementById('final-stats');
const cheerMessage = document.getElementById('cheer-message');


function switchScreen(screenToShow) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    screenToShow.classList.add('active');
}

function handleModeSelection(e) {
    playerName = playerNameInput.value.trim() || 'Adventurer';

    boardRows = parseInt(e.currentTarget.dataset.rows);
    boardCols = parseInt(e.currentTarget.dataset.cols);
    totalCards = boardRows * boardCols;

    if (totalCards % 2 !== 0) {
        console.error("Invalid board size. Total cards must be even.");
        return;
    }

    const pairsNeeded = totalCards / 2;
    iconSet = ALL_ICONS.slice(0, pairsNeeded);
    iconSet = iconSet.concat(iconSet);

    playerGreeting.textContent = `Hello, ${playerName}!`;
    resetGame();
    switchScreen(gameScreen);
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

function createCardElement(icon) {
    return `
        <div class="card" data-icon="${icon}">
            <div class="card-face card-front">${icon}</div>
            <div class="card-face card-back">?</div>
        </div>
    `;
}

function initializeBoard() {
    gameBoard.innerHTML = '';
    
    gameBoard.style.gridTemplateColumns = `repeat(${boardCols}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${boardRows}, 1fr)`;

    shuffle(iconSet);

    iconSet.forEach(icon => {
        const cardHTML = createCardElement(icon);
        gameBoard.insertAdjacentHTML('beforeend', cardHTML);
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
}

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `Time: ${timer}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function handleCardClick(e) {
    if (moves === 0 && !isTimerRunning) {
        startTimer();
    }
    
    if (lockBoard) return;
    const clickedCard = e.currentTarget;
    if (clickedCard.classList.contains('flip')) return;

    clickedCard.classList.add('flip');

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    
    matchesFound++;
    resetTurnVariables();
    
    if (matchesFound === totalCards / 2) {
        stopTimer();
        setTimeout(() => {
            showResultsScreen();
        }, 500);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetTurnVariables();
    }, 1000);
}

function resetTurnVariables() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
    stopTimer();
    matchesFound = 0;
    moves = 0;
    timer = 0;
    
    movesDisplay.textContent = 'Moves: 0';
    timerDisplay.textContent = 'Time: 0s';
    
    if (boardRows > 0) {
        initializeBoard();
    }
    resetTurnVariables();
}

function showResultsScreen() {
    resultsTitle.textContent = `Expedition Complete, ${playerName}!`;
    
    finalStats.innerHTML = `Board Size: ${boardRows} x ${boardCols}<br>Total Moves: ${moves}<br>Time Taken: ${timer} seconds`;
    
    const randomIndex = Math.floor(Math.random() * CHEER_MESSAGES.length);
    cheerMessage.textContent = CHEER_MESSAGES[randomIndex];

    switchScreen(resultsScreen);
}

modeButtons.forEach(button => {
    button.addEventListener('click', handleModeSelection);
});

resetButton.addEventListener('click', resetGame);

homeButton.addEventListener('click', () => {
    stopTimer();
    switchScreen(startScreen);
});

playAgainButton.addEventListener('click', () => {
    switchScreen(startScreen);
});

switchScreen(startScreen);