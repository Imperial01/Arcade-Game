let gameState = {
    player: "X",
    board: [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
}
//console.log(gameState.player)

//-------DOM
let board = document.querySelector('#board-container');
//-------RENDER FUNCTION
function render() {
    let gameArr = gameState.board;
    for (let i = 0; i < gameArr.length; i++) {
        for (let j = 0; j < gameArr[i].length; j++) {
            let cells = gameArr[i][j];
            let grid = document.createElement('div');
            grid.innerHTML = cells
            grid.className = 'grid-cell';
            board.appendChild(grid)
        }

    }

}
render();

// // gets a HTML collection (9)
let cell = document.getElementsByClassName('grid-cell')




//Handy Function
// function cellIndex() {
//let cell = document.getElementsByClassName('grid-cell')


function changeTurn() {
    let currentPlayer = gameState.player
    if (currentPlayer === "X"){
        currentPlayer = "O";
    }else{ 
        currentPlayer = "X"
    }
}


board.addEventListener('click', playerTurn);
function playerTurn(event) {
    let index = event.target;
    console.log(index.text)

    // if (index.innerHTML == " ") {
    //     index.innerHTML = changeTurn()
    // }
   


}

