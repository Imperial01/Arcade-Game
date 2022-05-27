let gameState = {
    players:[],
    board:[]
}
gameState = {
    players: ['x', 'o'],
    board: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]
  }
console.log(gameState.board)
//DOM
let board = document.querySelector('#board-container');
let cell = document.querySelector('#grid-cell')

//Handy Function
function render() {
    for (let i = 0; i < gameState.board.length; i++) {
        let grid_cells = gameState.board[i]
        let grid = document.createElement('div');
        grid.innerText = grid_cells.join(" ");
        grid.className = 'grid-cell'
        board.appendChild(grid);
        
        
    }
}



board.addEventListener('click',function(event){
    if(event.target.className == 'grid-cell'){
        gameState.board.value = player1
    }
})

function changeCell(event){
    
}

//bootStrap
// newGame();
render();
