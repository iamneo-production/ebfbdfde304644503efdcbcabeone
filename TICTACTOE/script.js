let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const cells = document.querySelectorAll('.btn');
const resultContainer = document.querySelector('.result-container');
function handleCellClick(e) {
    const cellIndex = parseInt(e.target.dataset.index);
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        e.target.value = currentPlayer;
        if (checkWin() || checkDraw()) {
            endGame();
            if (checkWin()) {
                resultContainer.textContent = `Player ${currentPlayer} wins!`;
            } else {
                resultContainer.textContent = "It's a draw!";
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateResult();
        }
    }
}
function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}
function checkDraw() {
    return !gameBoard.includes('');
}
function endGame() {
    gameActive = false;
    document.querySelector('.reset-btn').disabled = false;
}
function updateResult() {
    resultContainer.textContent = `Player ${currentPlayer}'s turn`;
}
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => {
        cell.value = '';
    });
    document.querySelector('.reset-btn').disabled = true;
    resultContainer.textContent = `Player ${currentPlayer}'s turn`;
}
document.querySelector('.reset-btn').addEventListener('click', resetGame);
updateResult();
