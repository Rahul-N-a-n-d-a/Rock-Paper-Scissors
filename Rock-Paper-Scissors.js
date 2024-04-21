let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, loses: 0, ties: 0 };

updateScore();

function pickComputerMove() {
    const random = Math.random();
    let computerMove = '';

    if (random > 0 && random <= 1 / 3) {
        computerMove = 'Rock';
    } else if (random > 1 / 3 && random <= 2 / 3) {
        computerMove = 'Paper';
    } else if (random > 2 / 3 && random < 1) {
        computerMove = 'Scissors';
    }
    return computerMove;
}

function playGame(playerMove) {
    let computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = "Tie.";
        } else if (computerMove === 'Paper') {
            result = 'You lose.';
        } else if (computerMove === 'Scissors') {
            result = 'You win.';
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = "You win.";
        } else if (computerMove === 'Paper') {
            result = 'Tie.';
        } else if (computerMove === 'Scissors') {
            result = 'You lose.';
        }
    } else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = "You lose.";
        } else if (computerMove === 'Paper') {
            result = 'You win.';
        } else if (computerMove === 'Scissors') {
            result = 'Tie.';
        }
    }
    if (result === 'You win.') {
        score.wins++;
    } else if (result === 'You lose.') {
        score.loses++;
    } else if (result === 'Tie.') {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-show-moves').innerHTML = `You <img class="move-icon" src="./Images/${playerMove}-emoji.png" alt=""><img class="move-icon" src="./Images/${computerMove}-emoji.png" alt="">computer`

    updateScore();
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('Scissors');
});

document.querySelector('.js-reset-button').addEventListener('click', () => {
   showResetConfirmation();
});

document.querySelector('.js-autoplay-button').addEventListener('click', () => {
    autoPlay();
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('Rock');
    } else if (event.key === 'p') {
        playGame('Paper');
    } else if (event.key === 's') {
        playGame('Scissors');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        showResetConfirmation();
    }
});

function updateScore() {
    document.querySelector('.score').innerHTML = `wins: ${score.wins}, loses: ${score.loses}, ties: ${score.ties}`;
}
function resetScore() {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoPlaying) {
        document.querySelector('.js-autoplay-button').innerHTML = 'Stop Playing';
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        document.querySelector('.js-autoplay-button').innerHTML = 'Auto Play';
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

function showResetConfirmation() {
    document.querySelector('.js-reset-text').innerHTML = `Are you sure you want to reset the score? 
                               <button class="js-reset-confirm-button reset-score-button">Yes</button>
                               <button class="js-reset-reject-button reset-score-button">No</button>`
    document.querySelector('.js-reset-confirm-button').addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
    })
    document.querySelector('.js-reset-reject-button').addEventListener('click', () => {
        hideResetConfirmation();
    })
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-text').innerHTML = '';
}