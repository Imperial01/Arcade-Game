let gameState = {
    player: "X",
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    changeTurn: function changeTurn() {
        gameState.player = gameState.player === "X" ? "O" : "X";
    },
    move: function () {
        gameState.board = gameState.changeTurn
    }
}
//-------DOM
let board = document.querySelector('#board-container');
let titleElem = document.getElementById('title')
let reset = document.querySelector('#reset')
let cellElem = document.querySelectorAll('grid-cell');
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');
let form = document.getElementById('player-form');
let playerElem = document.getElementById('player-nav')

//-------RENDER FUNCTION
let gameArr = gameState.board;
function renderBoard() {
    let count = 0
    for (let i = 0; i < gameArr.length; i++) {
        for (let j = 0; j < gameArr[i].length; j++) {
            let cells = gameArr[i][j];
            let grid = document.createElement('div');
            grid.innerHTML = cells;
            grid.id = 'cell-' + count;
            grid.dataset.idx = count;
            count++;
            grid.className = 'grid-cell';
            board.appendChild(grid);
        }

    }

}
renderBoard();

let cells = document.querySelectorAll('.grid-cell');
let boardState = Array(cells.length);
boardState.fill(null);

let winningCombos = [
    { combo: [0, 1, 2] },
    { combo: [3, 4, 5] },
    { combo: [6, 7, 8] },
    { combo: [0, 3, 6] },
    { combo: [1, 4, 7] },
    { combo: [2, 5, 8] },
    { combo: [0, 4, 8] },
    { combo: [2, 4, 6] },

];

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let playerRow = document.createElement('div')
    titleElem.appendChild(playerRow);
    playerRow.className = "playerList"
    playerElem.innerHTML = player1.value + " VERSUS " + player2.value
    form.style.display = "none"
    board.dataset.play = "ON"
    console.log(player1.value)
    
    titleElem.innerHTML = player1.value  + " is " +  gameState.player
    if (player1 && player2 !== true) {
        reset.removeAttribute('hidden');
    }
    if(player1.innerHTML !== ' '){
        console.log("one 1")
    }

})

cells.forEach((cell) => cell.addEventListener('click', titleClick));
function titleClick(event) {
    console.log(event.target);
    let index = event.target;
    let indexNum = index.dataset.idx;
    if (board.dataset.play !== "ON") {
        return
    }
    if (boardState[indexNum] !== null) {
        return
    }
    if (gameState.player == "X" && boardState[indexNum] == null) {
        index.innerText = gameState.player;
        boardState[indexNum] = gameState.player;
        gameState.changeTurn();
        console.log(boardState);
    } else {
        index.innerText = gameState.player;
        boardState[indexNum] = gameState.player;
        gameState.changeTurn();
        console.log(boardState[indexNum]);
    }
    checkWinner();
    cells.forEach((cell) => cell.addEventListener('click', titleClick));
    //console.log(checkWinner)
    if (titleElem.dataset.winner === gameState.player) {
        cells.forEach((cell) => cell.removeEventListener('click', titleClick));
        reset.removeAttribute('hidden');

    }

}

function checkWinner() {
    for (let winningCombo of winningCombos) {
        let { combo } = winningCombo
        let winA = boardState[combo[0]];
        let winB = boardState[combo[1]];
        let winC = boardState[combo[2]];
        if (!boardState.includes(null) && titleElem.innerHTML === 'Tic-Tac-Toe') {
            reset.removeAttribute('hidden');
            titleElem.innerHTML = ('Draw!');
            reset.innerHTML = "Play again?";
            cells.forEach((cell) => cell.removeEventListener('click', titleClick));
        }else if (winA && winA === winB && winA === winC) {
            gameState.changeTurn();
            let titleElem = document.getElementById('title');
            titleElem.innerHTML = ('You win ' + gameState.player);
            titleElem.dataset.winner = gameState.player;
            reset.removeAttribute('hidden');
            reset.innerHTML = "Play again?";
            cells.forEach((cell) => cell.removeEventListener('click', titleClick));
        } 
    
    }
}

function resetButton() {
    gameState.changeTurn();
    titleElem.innerHTML = 'Tic-Tac-Toe'
    titleElem.dataset.winner = ""
    cells.forEach((cell) => cell.addEventListener('click', titleClick));
    boardState.fill(null)
    form.style.display = 'flex'
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ''
    }
}



//bug: press start and if its a draw --> no buttons

