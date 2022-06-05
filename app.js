let gameState = {
    player: "X",
    computer: "O",
    board: [null, null, null, null, null, null, null, null, null],
    changeTurn: function changeTurn() {
        gameState.player = gameState.player === "X" ? "O" : "X";
    },
    move: function () {
        gameState.board = gameState.changeTurn
    }
}

//-------DOM---------------------------------
let titleElem = document.getElementById('title')
let board = document.querySelector('#board-container');
let cellElem = document.querySelectorAll('grid-cell');
let form = document.getElementById('player-form');
let playerElem = document.getElementById('player-nav')
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');
let reset = document.querySelector('#reset')
// let sizing = document.getElementById('sizing-container')
// let plusBoard = document.getElementById('increase-board')
// let minusBoard = document.getElementById('decrease-board')

//------------------RENDER FUNCTION--------------------
let boardArr = gameState.board;
function renderBoard() {
    board.innerText = ''
    let count = 0
    for (let i = 0; i < boardArr.length; i++) {
        let cell = boardArr[i];
        let grid = document.createElement('div');
        grid.innerHTML = cell;
        grid.id = 'cell-' + count;
        grid.dataset.idx = count;
        count++;
        grid.className = 'grid-cell';
        board.appendChild(grid);

    }
}
renderBoard();

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

//--------------------------- Event Listeners (Player click) -------------------------
//renderBoard();
let cells = document.querySelectorAll('.grid-cell');

cells.forEach((cell) => cell.addEventListener('click', cellClick));
function cellClick(event) {
    let index = event.target;
    let indexNum = index.dataset.idx;
    //renderBoard();
    if (board.dataset.play !== "ON") {
        return
    }
    if (boardArr[indexNum] !== null) {
        return
    }
    //---------------------------- Player Function -----------------------------    
    //----------------------Computer Function when clicking --------------------
    if (player2.value == "Computer") {
        gameState.player = "X"
        // gameState.computer = "O"
        computerMove();
        console.log('test')
        
    }
    if (gameState.player == "X" && boardArr[indexNum] == null) {
        index.innerText = gameState.player;
        boardArr[indexNum] = gameState.player;
        gameState.changeTurn();
        //renderBoard();
        console.log(boardArr);
        console.log(cellElem)
    } else {
        index.innerText = gameState.player;
        boardArr[indexNum] = gameState.player;
        gameState.changeTurn();
        console.log(boardArr)
        console.log(board)
    }
    
    cells.forEach((cell) => cell.addEventListener('click', cellClick));
    if (titleElem.dataset.winner === gameState.player) {
        //cells.forEach((cell) => cell.removeEventListener('click', cellClick));
        reset.removeAttribute('hidden');
        
    }
    
    renderBoard();
    checkWinner();

}


function computerMove() {
    do {
        randomNum = Math.floor(Math.random() * 9);

    } while (boardArr[randomNum] != null);
    boardArr[randomNum] = gameState.computer;

}

//-------------------------Check Winner------------------------------
function checkWinner() {
    for (let winningCombo of winningCombos) {
        let { combo } = winningCombo
        let winA = boardArr[combo[0]];
        let winB = boardArr[combo[1]];
        let winC = boardArr[combo[2]];
        gameState.changeTurn();
        if (!boardArr.includes(null) && !(winA && winA === winB && winA === winC)) {
            gameState.changeTurn();
            reset.removeAttribute('hidden');
            titleElem.innerHTML = ('Draw!');
            reset.innerHTML = "Play again?";
            cells.forEach((cell) => cell.removeEventListener('click', cellClick));
        }
        if (winA && winA === winB && winA === winC) {
            let titleElem = document.getElementById('title');
            titleElem.innerHTML = ('You win ' + gameState.player);
            titleElem.dataset.winner = gameState.player;
            reset.removeAttribute('hidden');
            reset.innerHTML = "Play again?";
            cells.forEach((cell) => cell.removeEventListener('click', cellClick));
        }

        gameState.changeTurn();
    }

}
//-------------------------- Event Listeners (submit button) --------------------------
form.addEventListener('submit', function (e) {
    e.preventDefault();
    boardArr.fill(null)
    cells.innerHTML = ''

    let playerRow = document.createElement('div')
    titleElem.appendChild(playerRow);
    playerRow.className = "playerList"
    playerElem.innerHTML = player1.value + " VERSUS " + player2.value
    form.style.display = "none"
    board.dataset.play = "ON"
    titleElem.innerHTML = player1.value + " is " + gameState.player

    if (player1 && player2 !== true) {
        reset.removeAttribute('hidden');
    }
    cells.forEach((cell) => cell.addEventListener('click', cellClick));
})
//------------------------ Reset Button ------------------------------------
function resetButton() {
    boardArr = [null, null, null, null, null, null, null, null, null];
    playerElem.innerHTML = player1.value + " VERSUS " + player2.value
    titleElem.innerHTML = player1.value + " is " + gameState.player
    titleElem.innerHTML = 'Tic-Tac-Toe'
    titleElem.dataset.winner = ""
    form.style.display = 'flex'
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ''
    }
    cells.forEach((cell) => cell.addEventListener('click', cellClick));
}



//--------------------- Bugs to Fix-------------------------------------
// * my render function stops my click function
// * if the opponent wins they go first, but its its a draw player order stays the same. 

