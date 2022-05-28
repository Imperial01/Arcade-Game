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
    },
    winningCombo: function () {
        let win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let combo of this.winningCombo) {
            let [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return combo
            }
        }
        return null
    }
}

//-------DOM
let board = document.querySelector('#board-container');
//-------RENDER FUNCTION
function render() {
    let gameArr = gameState.board;
    let count = 1
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


// // gets a HTML collection (9)
// let cell = document.querySelectorAll('.grid-cell')
// // console.log(cell)
// let result = Object.keys(cell)

// //console.log(result)
// let boardindex = function () {
//     for (let i = 0; i < gameState.board.length; i++) {
//         for (let j = 0; j < gameState.board[i].length; j++) {
//             let hello = gameState.board[i][j]
//             return hello
//         }
//     }

// }




//Handy Function
// function cellIndex() {
//let cell = document.getElementsByClassName('grid-cell')



// function changeTurn() {
//     let currentPlayer = gameState.player
//     if (currentPlayer === "X") {
//         return "O";
//     } else {
//         return "X"
//     }
// }
//console.log(board.dataset.cell)
//console.log(board)

board.addEventListener('click', playerTurn);
//let cell = document.getElementsByClassName('grid-cell')
function playerTurn(event) {
    let index = event.target;
    for (let i = 0; i < gameState.board.length - 1; i++) {
        if (index.cellClicked == null && index.className == "grid-cell" && index.innerHTML == '') {
            gameState.changeTurn();
            gameState.move();
            index.innerHTML = gameState.player

            console.log(index)
            console.log(gameState.board)
//------------trying to connect the input of HTML to the update the board array---
        }
    }

}

