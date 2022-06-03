let gameState = {
    player: "X",
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    changeTurn: function changeTurn() {
        gameState.player = gameState.player === "X" ? "O" : "X";
    },
    move: function () {
        gameState.board = gameState.changeTurn
    }
}
//-------DOM
let titleElem = document.getElementById('title')
let board = document.querySelector('#board-container');
let cellElem = document.querySelectorAll('grid-cell');
let form = document.getElementById('player-form');
let playerElem = document.getElementById('player-nav')
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');
let reset = document.querySelector('#reset')
let sizing = document.getElementById('sizing-container')
let plusBoard = document.getElementById('increase-board')
let minusBoard = document.getElementById('decrease-board')
console.log(sizing)
console.log(plusBoard)
console.log(minusBoard)


//-------RENDER FUNCTION
let gameArr = gameState.board;
let mergedBoard = [].concat.apply([],gameArr)
function renderBoard() {
    board.innerText = null
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
console.log(mergedBoard)

let cells = document.querySelectorAll('.grid-cell'); //keep
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

    titleElem.innerHTML = player1.value + " is " + gameState.player
    if (player1 && player2 !== true) {
        reset.removeAttribute('hidden');
    }
})
let randomNum = Math.floor(Math.random() * 9);
let randomTurn = mergedBoard[Math.floor(Math.random() * mergedBoard.length)];
console.log(randomNum)
cells.forEach((cell) => cell.addEventListener('click', titleClick));
function titleClick(event) {
    randomNum
    cells[randomNum];
    console.log(event.target);
    let index = event.target;
    let indexNum = index.dataset.idx;
    //renderBoard();
    if (board.dataset.play !== "ON") {
        return
    }
    if (mergedBoard[indexNum] !== null) {
        return
    }
    if (gameState.player == "X" && mergedBoard[indexNum] == null) {
        index.innerText = gameState.player;
        mergedBoard[indexNum] = gameState.player;
        gameState.changeTurn();
        console.log(mergedBoard);
    } else {
        index.innerText = gameState.player;
        mergedBoard[indexNum] = gameState.player;
        gameState.changeTurn();
        console.log(mergedBoard[indexNum]);
    }
    checkWinner();
    
    if (board.dataset.play == "ON" && player2.value == "Computer" && mergedBoard.includes(null)) {
        for (let i = 0; i < cells.length; i++){
            //console.log(cells[i])
            autoSelect()
            cells[randomNum].innerHTML = "O";
            randomNum;
        }
        
        //renderBoard();
        
        console.log(mergedBoard)
    }

    cells.forEach((cell) => cell.addEventListener('click', titleClick));
    if (titleElem.dataset.winner === gameState.player) {
        cells.forEach((cell) => cell.removeEventListener('click', titleClick));
        reset.removeAttribute('hidden');

    }
    

}

function checkWinner() {
    for (let winningCombo of winningCombos) {
        let { combo } = winningCombo
        let winA = mergedBoard[combo[0]];
        let winB = mergedBoard[combo[1]];
        let winC = mergedBoard[combo[2]];
        if (!mergedBoard.includes(null) && titleElem.innerHTML === 'Tic-Tac-Toe') {
            reset.removeAttribute('hidden');
            titleElem.innerHTML = ('Draw!');
            reset.innerHTML = "Play again?";
            cells.forEach((cell) => cell.removeEventListener('click', titleClick));
        } else if (winA && winA === winB && winA === winC) {
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
    mergedBoard.fill(null)
    form.style.display = 'flex'
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ''
    }
    checkWinner();
}

function autoSelect() {
    console.log(randomTurn)
    for (let i = 0; i < mergedBoard.length; i++) {
        mergedBoard[randomNum] = "O";
    };

};
//bug: press start and if its a draw --> no buttons
// let cellGrid = document.querySelectorAll('.grid-cell')
// minusBoard.addEventListener('click', function (e) {
//     board.style.height = "41vh"
//     board.style.width = "50em"
//     cellGrid.style.width = "15vh"
//     cellGrid.style.height = '12vh'
// })
