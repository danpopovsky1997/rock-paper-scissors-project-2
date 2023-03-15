const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
    player: 0,
    computer: 0
};

/**
 * This section controls the background audio of the game
 */
var audio = document.getElementById("bg-sound");
audio.volume = 0.50;

var volOn = document.getElementById("vol-on");
var volOff = document.getElementById("vol-off");

volOn.onclick = function () {
    volOn.style.display = "none";
    volOff.style.display = "block";

    var audioElement = document.getElementById("bg-sound");
    audioElement.muted = true;
}

volOff.onclick = function () {
    volOn.style.display = "block";
    volOff.style.display = "none";
    var audioElement = document.getElementById("bg-sound");
    audioElement.muted = false;
}

/**
 * This function allows the user the play game
 */
function play(e) {
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
}

/**
 * This function gets the computer choice
 */
function getComputerChoice() {
    const rand = Math.random();
    if (rand < 0.34) {
        return 'rock';
    } else if (rand <= 0.67) {
        return 'paper';
    } else {
        return 'scissors'
    }
}

/**
 * This function gets the game winner
 */
function getWinner(p, c) {
    if (p === c) {
        return 'draw';
    } else if (p === 'rock') {
        if (c === 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'paper') {
        if (c === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'scissors') {
        if (c === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}

/**
 * This function Inc player score and modal result, Inc computer score and modal result and shows the score on the scoreboard
 */
function showWinner(winner, computerChoice) {
    if (winner === 'player') {
        scoreboard.player++;
        result.innerHTML = `
        <h1 class="text-win">You Win</h1>
        <i class="fa-regular fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
        document.getElementById("win-sound").play();
    } else if (winner === 'computer') {
        scoreboard.computer++;
        result.innerHTML = `
        <h1 class="text-lose">You Lose</h1>
        <i class="fa-regular fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
        document.getElementById("lose-sound").play();
    } else {
        result.innerHTML = `
        <h1>It's a Draw</h1>
        <i class="fa-regular fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
        document.getElementById("draw-sound").play();
    }
    score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

    modal.style.display = 'block';
}

/**
 * This function allows the user to restart the game
 */
function restartGame() {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
    `;
    restart.style.display = 'none';
}

/**
 * This function clears the modal
 */
function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

/**
 * These are the event listeners
 */
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);