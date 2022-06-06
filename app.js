let gameState = {
    player: "X",
    computer: "O",
    board: [null, null, null, null, null, null, null, null, null],
    changeTurn: function changeTurn() {
        gameState.player = gameState.player === "X" ? "O" : "X";
    },

}

//-------DOM---------------------------------
let titleElem = document.getElementById('title')
let board = document.querySelector('#board-container');
let cellElem = document.querySelectorAll('grid-cell');
let form = document.getElementById('player-form');
let playerElem = document.getElementById('player-nav')
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');
let submit = document.querySelector('#submit')
let reset = document.querySelector('#reset');
let computer = document.getElementById('computerUser')
let switchPlayers = document.getElementById('switchUsers')

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
        grid.addEventListener('click', cellClick)

    }
}
renderBoard();
let cells = document.querySelectorAll('.grid-cell');



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
cells.forEach((cell) => cell.addEventListener('click', cellClick));
function cellClick(event) {
    //checkWinner();
    let index = event.target;
    let indexNum = index.dataset.idx;
    if (board.dataset.play !== "ON") {
        return
    }
    if (boardArr[indexNum] !== null) {
        return
    }

    //---------------------------- Player Function ----------------------------------------    

    if (gameState.player == "X" && boardArr[indexNum] == null) {
        index.innerText = gameState.player;
        boardArr[indexNum] = gameState.player;
        gameState.changeTurn();
        checkWinner();
        console.log(boardArr);
        console.log(cellElem)
    } else {
        index.innerText = gameState.player;
        boardArr[indexNum] = gameState.player;
        gameState.changeTurn();
        checkWinner();
    }
    //----------------------Computer Function when clicking --------------------===========
    if (playerElem.dataset.player === "Computer") {
        gameState.player = "X"
        computerMove();
        gameState.changeTurn();
        checkWinner();
    }

    if (titleElem.dataset.winner === gameState.player) {
        cells.forEach((cell) => cell.removeEventListener('click', cellClick));
        reset.removeAttribute('hidden');

    }
    checkWinner();
    renderBoard();
}


//---------------------- Helper Functions ----------------------------------    
function computerMove() {
    do {
        randomNum = Math.ceil(Math.random() * 7);
        
    } while (boardArr[randomNum] != null && boardArr[randomNum]);
    boardArr[randomNum] = gameState.computer;
    checkWinner();
    
}

function checkWinner() {
    gameState.changeTurn();
    titleElem.innerHTML= "Tic-Tac-Toe"
    for (let winningCombo of winningCombos) {
        let { combo } = winningCombo
        let winA = boardArr[combo[0]];
        let winB = boardArr[combo[1]];
        let winC = boardArr[combo[2]];
        if (winA && winA === winB && winA === winC) {
            board.dataset.play = "OFF"
            let titleElem = document.getElementById('title');
            titleElem.innerHTML = ('You win ' + winA);
            if (playerElem.dataset.player === "Computer"){
                titleElem.innerHTML = 'You win ' + winA
                gameState.changeTurn();
            }
            cells.forEach((cell) => cell.removeEventListener('click', cellClick));
            gameState.changeTurn();
            titleElem.dataset.winner = gameState.player;
            reset.removeAttribute('hidden');
            reset.style.display = 'flex'
            reset.innerHTML = "Reset";
        }
        if (!boardArr.includes(null) && !(winA && winA === winB && winA === winC)) {
            board.dataset.play = "OFF"
            reset.removeAttribute('hidden');
            titleElem.innerHTML = ('Draw!');
            reset.style.display = 'flex'
            reset.innerHTML = "Play again?";
        }

    }

}

function switchUsers() {
    const user1 = player1.value
    const user2 = player2.value
    switchPlayers.addEventListener('click', function (event) {
        player1.value = user2
        player2.value = user1

    })
    if (gameState.player === "O") {
        titleElem.innerHTML = player1.value + " GO! "
    }
    submit.innerHTML = "Enter Players"



    if (gameState.player === "O") {
        titleElem.innerHTML = player2.value + " GO! "
    } else if (gameState.player === "X") {

        titleElem.innerHTML = player1.value + " GO! "
    }
}

function computerUser() {
    player2.value = "Computer"
    submit.innerHTML = "Good Luck"
    form.style.display = "flex"
    reset.style.display = 'flex'

}
//-------------------------- Submit Button --------------------------
form.addEventListener('submit', function (e) {
    e.preventDefault();
    boardArr.fill(null)
    cells.innerHTML = ''
    computer.style.display = 'none'
    switchPlayers.style.display = 'none'
    if (player2.value == "Computer") {
        playerElem.dataset.player = "Computer"
        switchPlayers.style.display = 'none'
        gameState.player = "X"
        titleElem.innerHTML = player1.value + " is X"

    }

    if (player2.value !== "Computer") {
        titleElem.innerHTML = player1.value + " is " + gameState.player
    }
    if (player1 && player2 !== true) {
        reset.removeAttribute('hidden');
    }
    let playerRow = document.createElement('div')
    titleElem.appendChild(playerRow);
    playerRow.className = "playerList"
    player1.dataset.player = player1.value
    player2.dataset.player = player2.value
    playerElem.innerHTML = player1.dataset.player + " VERSUS " + player2.dataset.player
    form.style.display = "none"
    reset.style.display = 'none'
    board.dataset.play = "ON"
    titleElem.innerHTML = player1.dataset.player + " is " + gameState.player
    cells.forEach((cell) => cell.addEventListener('click', cellClick));
});
//------------------------ Reset Button ------------------------------------
function resetButton() {
    boardArr = [null, null, null, null, null, null, null, null, null];
    renderBoard();
    titleElem.dataset.winner = ""
    board.dataset.play = "ON"
    switchPlayers.style.display = 'flex'
    computer.style.display = 'flex'
    form.style.display = 'flex'
    titleElem.innerHTML = 'Tic-Tac-Toe'
    if (player2.value === "Computer") {
        player2.dataset.player = "Computer"
        return titleElem.innerHTML = player1.value + " is X"

    }
    playerElem.dataset.player = ''
    gameState.changeTurn();
    submit.innerHTML = 'Enter Players'

}

//--------------------- Bugs to Fix-------------------------------------
// * website crashes if there is one cell left in Computer mode.
