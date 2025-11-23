let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let currentPlayer = "X";
let gameOver = false;

const boxes = document.querySelectorAll(".box");
const status = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

function handleMove(box) {
    if (gameOver) return;

    const row = Number(box.dataset.row);
    const col = Number(box.dataset.col);

    if (board[row][col] !== "") return; 

    board[row][col] = currentPlayer;
    box.textContent = currentPlayer;

    const winLine = checkWin(currentPlayer);
    if (winLine) {
        status.textContent = `${currentPlayer} wins!`;
        highlightWinner(winLine);
        gameOver = true;
        return;
    }

    if (board.flat().every(x => x !== "")) {
        status.textContent = "It's a tie!";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `${currentPlayer}'s turn`;
}

const lines = [
    [[0, 0], [0, 1], [0, 2]], // row 0
    [[1, 0], [1, 1], [1, 2]], // row 1
    [[2, 0], [2, 1], [2, 2]], // row 2
    [[0, 0], [1, 0], [2, 0]], // column 0
    [[0, 1], [1, 1], [2, 1]], // column 1
    [[0, 2], [1, 2], [2, 2]], // column 2
    [[0, 0], [1, 1], [2, 2]], // diogonal
    [[0, 2], [1, 1], [2, 0]], // diagonal
];

function checkWin(turn) {
    for (let line of lines) {
        let win = true;

        for (let pos of line) {
        const [row, col] = pos;
        if (board[row][col] !== turn) {
            win = false;
            break;
        }
        }
        if (win) return line; 
    }

    return null;
}


function highlightWinner(line) {
    line.forEach(([r,c]) => {
        document.querySelector(`.box[data-row="${r}"][data-col="${c}"]`)
        .classList.add("winner");
    });
}

    boxes.forEach(box => {
        box.addEventListener("click", () => handleMove(box));
    });

    resetBtn.addEventListener("click", () => {
        board = [["","",""],["","",""],["","",""]];
        currentPlayer = "X";
        gameOver = false;

        status.textContent = "X's turn";

    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove("winner");
    });
});
