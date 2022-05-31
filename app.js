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

//console.log(gameState.changeTurn())
//-------DOM
let board = document.querySelector('#board-container');
let titleElem = document.getElementById('title')
let reset = document.querySelector('button')
console.log(reset)
//-------RENDER FUNCTION
function render() {
    let gameArr = gameState.board;
    let count = 0
    for (let i = 0; i < gameArr.length; i++) {
        for (let j = 0; j < gameArr[i].length; j++) {
            let cells = gameArr[i][j];
            let grid = document.createElement('div');
            grid.innerHTML = cells
            grid.id = 'cell-' + count;
            grid.dataset.idx = count
            count++
            grid.className = 'grid-cell';

            board.appendChild(grid)
        }

    }
    
}
render();

function resetButton() {
    boardState.fill(null)
    
    
   
    console.log(boardState)
    console.log(cells.innerHTML)
}
let cells = document.querySelectorAll('.grid-cell')

let boardState = Array(cells.length)
boardState.fill(null)

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

cells.forEach((cell) => cell.addEventListener('click', titleClick));
function titleClick(event) {

    //let gridElem = document.getElementsByTagName()
    console.log(event.target)
    let index = event.target
    let indexNum = index.dataset.idx;
    if (boardState[indexNum] !== null) {
        return
    }
    if (gameState.player == "X" && boardState[indexNum] == null) {
        index.innerText = gameState.player;
        boardState[indexNum] = gameState.player
        gameState.changeTurn();
        console.log(boardState)
    } else {
        index.innerText = gameState.player;
        boardState[indexNum] = gameState.player;
        gameState.changeTurn()
        console.log(boardState[indexNum])
    }
    checkWinner();
    //console.log(checkWinner)
    if (titleElem.dataset.winner === gameState.player) {
        cells.forEach((cell) => cell.removeEventListener('click', titleClick));
        reset.removeAttribute('hidden')
        //cells.forEach((cell)) => cell.removeEventListener('click',titleClick));
    }

}


function checkWinner() {
    for (let winningCombo of winningCombos) {
        let { combo } = winningCombo
        let winA = boardState[combo[0]];
        let winB = boardState[combo[1]];
        let winC = boardState[combo[2]];
        if (winA && winA === winB && winA === winC) {
            gameState.changeTurn();
            let titleElem = document.getElementById('title')
            titleElem.innerHTML = ('You win ' + gameState.player);
            titleElem.dataset.winner = gameState.player
            reset.removeAttribute('hidden')
            reset.innerHTML = "Play again?"
        } else if (!boardState.includes(null) && titleElem.innerHTML === 'Tic-Tac-Toe') {
            titleElem.innerHTML = ('Draw!')
            reset.removeAttribute('hidden')
            reset.innerHTML = "Play again?"
            cells.forEach((cell) => cell.removeEventListener('click', titleClick));

        }



    }
}

