// JavaScript variables to track game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Select all input fields with class "btn"
const cells = document.querySelectorAll('.btn');

// Function to handle cell click event
function handleCellClick(e) {
    const cellIndex = parseInt(e.target.dataset.index);

    // Check if the cell is empty and the game is active
    if (gameBoard[cellIndex] === '' && gameActive) {
        // Update the game board and display the current player's move
        gameBoard[cellIndex] = currentPlayer;
        e.target.value = currentPlayer;

        // Check for a win or a draw
        if (checkWin() || checkDraw()) {
            endGame();
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateResult();
        }
    }
}

// Function to check for a win
function checkWin() {
    // Define winning combinations
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

// Function to check for a draw
function checkDraw() {
    return !gameBoard.includes('');
}

// Function to end the game
function endGame() {
    gameActive = false;
    document.querySelector('.reset-btn').disabled = false;
}

// Function to update the result container
function updateResult() {
    document.querySelector('.result-container').textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners to each cell for clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    cells.forEach(cell => {
        cell.value = '';
    });

    document.querySelector('.reset-btn').disabled = true;
    document.querySelector('.result-container').textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listener to the reset button
document.querySelector('.reset-btn').addEventListener('click', resetGame);

// Initialize the game
updateResult();
