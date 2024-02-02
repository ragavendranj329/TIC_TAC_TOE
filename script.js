const boxs = document.querySelectorAll('.box');
const statusTxt = document.querySelector('#status');
const xWinsTxt = document.querySelector('#xWins');
const oWinsTxt = document.querySelector('#oWins');
const btnRestart = document.querySelector('#restart');

let x = "<img class='symbol' src='../IMAGES/X_IMAGE.webp'>";
let o = "<img class='symbol' src='../IMAGES/O_IMAGE.jpg'>";

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;
let xWins = 0;
let oWins = 0;

init();

function init() {
    boxs.forEach(box => box.addEventListener('click', boxClick));
    btnRestart.addEventListener('click', restartGame);
    statusTxt.textContent = `${player} Your Turn`;
    updateWins();
    running = true;
}

function boxClick() {
    const index = this.dataset.index;
    if (options[index] !== "" || !running) {
        return;
    }
    updateBox(this, index);
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = currentPlayer;
    checkWinner();
    changePlayer();
}

function changePlayer() {
    currentPlayer = (currentPlayer === x) ? o : x;
    player = (player === "X") ? "O" : "X";
    statusTxt.textContent = `${player} Your Turn`;
}

function checkWinner() {
    for (let i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        if (options[a] !== "" && options[a] === options[b] && options[a] === options[c]) {
            statusTxt.textContent = `${player} Wins!`;
            if (player === "X") {
                xWins++;
            } else {
                oWins++;
            }
            updateWins();
            running = false;
            return;
        }
    }

    if (options.every(option => option !== "")) {
        statusTxt.textContent = "It's a Draw!";
        running = false;
    }
}

function updateWins() {
    xWinsTxt.textContent = `X Wins: ${xWins}`;
    oWinsTxt.textContent = `O Wins: ${oWins}`;
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = x;
    player = "X";
    running = true;
    boxs.forEach(box => {
        box.innerHTML = "";
    });
    statusTxt.textContent = `${player} Your Turn`;
}
