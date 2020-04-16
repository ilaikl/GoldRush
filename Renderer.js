class Renderer {
    constructor() {
    }
    renderBoard(matrix, p1score, p2score) {
        $("#main").empty()
        $("#main").css({ "grid-template-columns": `repeat(${matrix[0].length},1fr)`, "grid-template-rows": `repeat(${matrix.length},1fr)` })

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 'c')
                    $("#main").append("<i class='fas fa-coins'></i>")
                else if (matrix[i][j] == '.')
                    $("#main").append("<i></i>")
                else if (matrix[i][j] == '1')
                    $("#main").append("<i class='player1 fas fa-smile'></i>")
                else if (matrix[i][j] == '2')
                    $("#main").append("<i class='player2 fas fa-smile'></i>")
                else if (matrix[i][j] == 'w')
                    $("#main").append("<div class='obstacle'></div>")
                else    
                    $("#main").append("<div></div>")
            }
        }
        $("#player1Score").text("Player 1: " + p1score)
        $("#player2Score").text("Player 2: " + p2score)
    }
    renderEnd(p1score, p2score) {
        let result = ''
        if (p1score > p2score) result = 'Player 1 Won!'
        else if (p1score < p2score) result = 'Player 2 Won!'
        else result = "It's a tie..."
        $("#main").empty()
        $("#main").css({ "grid-template-columns": ``, "grid-template-rows": `` })
        $("#main").append(`<p class='results'>Player 1 score: ${p1score}<br>Player 2 score: ${p2score}<br>${result}</p>`)
    }

}