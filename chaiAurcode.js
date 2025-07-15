let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessFeild');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrhi = document.querySelector('.lowOrhi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let preGuess = [];
let numGuess = 1;
let playgame = true;

if (playgame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault(); // prevent default form submission
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 0');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        preGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game over! You used all attempts. The number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`🎉 Congratulations! You guessed it right.`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Your guess is too low ⬇️`);
    } else {
        displayMessage(`Your guess is too high ⬆️`);
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    numGuess++;
    remaining.innerHTML = `${12 - numGuess}`;
}

function displayMessage(message) {
    lowOrhi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p);
    playgame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function () {
        randomNumber = parseInt(Math.random() * 100 + 1); // FIXED!
        preGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        lowOrhi.innerHTML = '';
        playgame = true;
    });
}
