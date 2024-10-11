const colors = ['red', 'green', 'yellow', 'blue'];
let sequence = []; //create array for sequence
let mySequence = []; //keep track of rounds
let score = 0; //variable for score
let highScore = 0; //variable for last games score
let interval = 1000; //variable for creating interval between each press
let Playing = false;

const CurrentScore = document.getElementById("score");
const HighScore = document.getElementById("highScore");

function StartGame() {
    if (!Playing) {
        Playing = true;
        score = 0;
        sequence = [];
        mySequence = [];
        document.getElementById("status-indicator").style.backgroundColor = "green";
        setTimeout(playGame, 3000);
    }
}

function playGame() {
    addcolor();
    mySequence = [];
    showSeq();
}

function addcolor() {
    const random = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(random);
}

function showSeq() {
    let x = 0;
    const valid = setInterval(() => {
        if (x < sequence.length) {
            Blink(sequence[x]);
            x++;
        } else {
            clearInterval(valid);
        }
    }, interval);
}

function Blink(color) {
    const button = document.getElementById(color)
    button.style.opacity = 0.5;
    setTimeout(() => {
        button.style.opacity = 1;
    }, 500);
}

function check(color) {
    if (Playing) {
        mySequence.push(color);
        if (mySequence.length === sequence.length) {
            if (CheckArrayEqual(mySequence, sequence)) {
                score++;
                score.innerHTML = score;
                if (score > highScore) {
                    highScore = score;
                    HighScore.innerHTML = highScore;
                }
                if (score === 5 || score === 9 || score === 13) {
                    interval -= 200;
                }
                setTimeout(playGame, 1500)
            } else {
                end();
            }
        }
    }
}

function end() {
    Playing = false;
    document.getElementById("status-indicator").style.backgroundColor = "red";
    sequence = [];
}

function CheckArrayEqual(array1, array2) {
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