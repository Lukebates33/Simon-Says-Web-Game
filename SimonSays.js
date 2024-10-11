const colors = ['red', 'green', 'yellow', 'blue']; // Color array
let sequence = []; // Array for the computer's sequence
let mySequence = []; // Array to keep track of player's moves
let score = 0; // Player's score
let highScore = 0; // Highest score from previous games
let interval = 1500; // Initial interval between each press
let Playing = false; // Indicates whether the game is currently active
let signalsInSequence = 0; // Number of signals in the current sequence
let timer; // Timer for handling timeouts

const HighScore = document.getElementById("highScore"); // High score display element
const CurrentScore = document.getElementById("score"); // Current score display element
const timeout = 5000; // Timeout duration in milliseconds

function StartGame() { // Function to start the game
    if (!Playing) {
        Playing = true;
        score = 0;
        sequence = [];
        mySequence = [];
        signalsInSequence = 0;
        document.getElementById("status-indicator").style.backgroundColor = "green"; // Change status indicator to green
        setTimeout(playGame, 1000); // Start the game after a delay
    }
}

function playGame() { // Function to play the game
    addcolor();
    mySequence = [];
    showSeq();
}

function addcolor() { // Function to add a random color to the sequence
    const random = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(random);
}

function showSeq() { // Function to display the computer's sequence
    let x = 0;
    const valid = setInterval(() => {
        if (x < sequence.length) {
            Blink(sequence[x]);
            x++;
        } else {
            clearInterval(valid);
        }
    }, interval);
    // Start the timer after the sequence display is complete
    setTimeout(() => {
        startTimer(handleTimeout);
    }, sequence.length * interval);
}

function Blink(color) { // Function to cause button to blink
    const button = document.getElementById(color)
    button.style.opacity = 0.5;
    setTimeout(() => {
        button.style.opacity = 1;
    }, 500);
}

function check(color) { // Function to handle player's move
    if (Playing) {
        mySequence.push(color);
        resetTimer(); // Reset the timer after each move
        if (mySequence.length === sequence.length) {
            signalsInSequence++; // Increment signals in sequence counter
            if (signalsInSequence === 5 || signalsInSequence === 9 || signalsInSequence === 13) {
                DecreaseInterval(); // Speed up interval
            }
            if (CheckArrayEqual(mySequence, sequence)) {
                score++;
                CurrentScore.innerHTML = score;
                setTimeout(playGame, 1200); // Start next round after a delay
            } else {
                end();
            }
        }
    }
}




function DecreaseInterval() { // Function to decrease the interval
    interval -= 300; // Decrease interval by 300 milliseconds
    if (interval < 200) { // interval cant go below 200 milliseconds
        interval = 200;
    }
    console.log('Interval decreased to:', interval); // Log the interval
}

function end() { // Function to end the game and keep track of high score
    if (score > highScore) {
        highScore = score;
        HighScore.innerHTML = highScore;
    }
    Playing = false; // Game is over
    document.getElementById("status-indicator").style.backgroundColor = "red"; // changes status indicator to red
    sequence = []; // Reset sequence
    endBlink(); // Start end blinks
    resetTimer(); // Reset timer
}

function endBlink() { // Function to make all colors blink 5 times when the game ends
    //const blinktime = 500;
    const blinkamount = 5;
    let counter = 0;
    let flashInterval = setInterval(() => {
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            Blink(color);
        }
        counter++;
        if (counter === blinkamount) {
            clearInterval(flashInterval);
        }
    }, 1000);
}

function CheckArrayEqual(array1, array2) { // Function to check if user sequence matches computers sequence
    if (array1.length !== array2.length) {
        return false;
    }
    for (let x = 0; x < array1.length; x++) {
        if (array1[x] !== array2[x]) {
            return false;
        }
    }
    return true;
}

function startTimer(timeoutCallback) { // Function to start timer
    timer = setTimeout(() => {
        clearTimeout(timer);
        timeoutCallback();
    }, timeout);
}

function resetTimer() { // Function to reset timer
    clearTimeout(timer);
}

function handleTimeout() { // Function to handle timeout and end the game
    end();
}
