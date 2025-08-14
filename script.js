// Seletores de elementos do DOM
const board = document.getElementById('board');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');
const player1ScoreEl = document.getElementById('player1-score');
const player2ScoreEl = document.getElementById('player2-score');

// Variáveis de estado do jogo
let currentPlayer = 'X'; // 'X' para o jogador 1, 'O' para o jogador 2
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let player1Score = 0;
let player2Score = 0;

// Condições de vitória
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

// Funções do jogo

// Atualiza a mensagem de status para o jogador atual
function updateStatusMessage() {
    if (isGameActive) {
        statusMessage.textContent = `É a vez do Jogador ${currentPlayer === 'X' ? '1 (X)' : '2 (O)'}`;
        statusMessage.className = `status-message ${currentPlayer === 'X' ? 'player1-color' : 'player2-color'}`;
    }
}

// Inicia o jogo ou reinicia o tabuleiro
function initializeGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X'; // Sempre começa com o jogador 1
    updateStatusMessage();

    // Limpa o tabuleiro
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
}

// Verifica se há um vencedor
function checkWin() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

// Verifica se o jogo empatou
function checkDraw() {
    return boardState.every(cell => cell !== '');
}

// Lida com o clique em uma célula
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Impede a jogada se a célula já estiver preenchida ou o jogo tiver acabado
    if (boardState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    // Atualiza o estado do tabuleiro e a interface
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer === 'X' ? 'player1-piece' : 'player2-piece');

    // Verifica se houve vitória ou empate
    if (checkWin()) {
        statusMessage.textContent = `🎉 O Jogador ${currentPlayer === 'X' ? '1 (X)' : '2 (O)'} venceu! 🎉`;
        statusMessage.classList.add(currentPlayer === 'X' ? 'player1-color' : 'player2-color');
        isGameActive = false;
        updateScore();
        return;
    }

    if (checkDraw()) {
        statusMessage.textContent = 'Parece que foi um empate!';
        statusMessage.className = 'status-message';
        isGameActive = false;
        return;
    }

    // Troca o turno do jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusMessage();
}

// Atualiza o placar
function updateScore() {
    if (currentPlayer === 'X') {
        player1Score++;
        player1ScoreEl.textContent = `Jogador 1: ${player1Score}`;
    } else {
        player2Score++;
        player2ScoreEl.textContent = `Jogador 2: ${player2Score}`;
    }
}

// Adiciona os event listeners
board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', initializeGame);

// Inicializa o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', initializeGame);
