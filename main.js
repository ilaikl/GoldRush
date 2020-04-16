let board
let renderer = new Renderer()
$(document).keypress(function (e) {
    if (!board) return
    let changed = true
    switch (e.which) {
        case 119:
            board.movePlayer(1, "up")
            break;
        case 115:
            board.movePlayer(1, "down")
            break;
        case 97:
            board.movePlayer(1, "left")
            break;
        case 100:
            board.movePlayer(1, "right")
            break;

        case 105:
            board.movePlayer(2, "up")
            break;
        case 107:
            board.movePlayer(2, "down")
            break;
        case 106:
            board.movePlayer(2, "left")
            break;
        case 108:
            board.movePlayer(2, "right")
            break;
        default:
            changed = false
            break;
    }
    if (changed){
        renderer.renderBoard(board.matrix,board.player1Score,board.player2Score)
        if(board.player1Score+board.player2Score==board.numOfCoins)
        {
            renderer.renderEnd(board.player1Score,board.player2Score)
        }
    }
})

const start = function () {
    board = new GoldRushMat()
    board.generateMatrix($("#rowsInput").val(), $("#colsInput").val())
    board.loadBoard()
    board.initializePlayerPositions()
    board.print()
    renderer.renderBoard(board.matrix,0,0)
}

