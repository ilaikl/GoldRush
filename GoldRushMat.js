
class GoldRushMat extends Matrix {
    constructor(r, c) {
        super(r, c)
        this.player1Score = 0
        this.player2Score = 0
        this.numOfCoins = 10
        this.numOfWalls = 10
    }

    loadBoard() {
        const coins = this.numOfCoins

        if (coins > this.matrix.length * this.matrix[0].length) {
            this.numOfCoins = this.matrix.length * this.matrix[0].length - 2
            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix[i].length; j++) {
                    this.matrix[i][j] = 'c'
                }
            }
            return
        }

        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.matrix[i][j] = '.'
            }
        }

        let openPoses = []

        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                openPoses.push({ x: i, y: j })
            }
        }

        openPoses = openPoses.slice(1, openPoses.length - 1)
        for (let i = 0; i < coins; i++) {
            let randPos = Math.floor(Math.random() * (openPoses.length - 1))

            if (this.matrix[openPoses[randPos].x][openPoses[randPos].y] == '.') {
                this.matrix[openPoses[randPos].x][openPoses[randPos].y] = 'c'
                openPoses.splice(randPos, 1)
            }
        }

        let matB=new Matrix()
        matB=this.duplicateThisMatToAnother(matB)
        let openPosesB = [...openPoses]

        for (let i = 0; i < this.numOfWalls; i++) {
            if(openPoses.length==0 && i<this.numOfWalls){
                openPoses=openPosesB
                i=0
                this.duplicateAnotherMatToThis(matB)
            }

            let randPos = Math.floor(Math.random() * (openPoses.length - 1))
            if(openPoses[randPos]==undefined){

                this.numOfWalls--
                this.loadBoard()
                return
            }
            this.matrix[openPoses[randPos].x][openPoses[randPos].y] = 'w'
            let sucs = this.dfs()
            if (!sucs) {
                this.matrix[openPoses[randPos].x][openPoses[randPos].y] = '.'
                i--
            }
            openPoses.splice(randPos, 1)
        }
    }

    duplicateAnotherMatToThis(anotherMat){
        for (let i = 0; i < anotherMat.getRowsLength(); i++) {
            for (let j = 0; j < anotherMat.getColsLength(); j++) {
                this.matrix[i][j]=anotherMat.get(i,j)
            }
        }
    }

    duplicateThisMatToAnother(newMat){
        newMat.generateMatrix(this.matrix.length, this.matrix[0].length)
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                newMat.alter(i,j,this.matrix[i][j])
            }
        }
        return newMat
    }

    dfs() {
        let visitedMat = new Matrix()
        let dfsStack = new Stack()
        visitedMat.generateMatrix(this.matrix.length, this.matrix[0].length)
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] != 'w')
                    visitedMat.alter(i, j, 'u')
                else
                    visitedMat.alter(i, j, 'v')
            }
        }

        dfsStack.push({ i: 0, j: 0 })

        while (!dfsStack.isEmpty()) {
            let point = dfsStack.peek()

            visitedMat.alter(point.i, point.j, 'v')

            if (visitedMat.get(point.i - 1, point.j) == 'u') {
                dfsStack.push({ i: point.i - 1, j: point.j })
            } else if (visitedMat.get(point.i, point.j + 1) == 'u') {
                dfsStack.push({ i: point.i, j: point.j + 1 })
            } else if (visitedMat.get(point.i + 1, point.j) == 'u') {
                dfsStack.push({ i: point.i + 1, j: point.j })
            } else if (visitedMat.get(point.i, point.j - 1) == 'u') {
                dfsStack.push({ i: point.i, j: point.j - 1 })
            } else {
                dfsStack.pop()
            }
        }

        for (let i = 0; i < visitedMat.getRowsLength(); i++) {
            for (let j = 0; j < visitedMat.getColsLength(); j++) {
                if (visitedMat.get(i,j) == 'u')
                    return false
            }
        }
        return true

    }

    initializePlayerPositions() {
        this.players = [{ r: 0, c: 0 }, { r: this.matrix.length - 1, c: this.matrix[0].length - 1 }]
        this.matrix[0][0] = '1'
        this.matrix[this.matrix.length - 1][this.matrix[0].length - 1] = '2'
    }

    changePlayerPosition(p, r, c) {
        p = p % 2
        if (this.matrix[r][c] == '1' || this.matrix[r][c] == '2' || this.matrix[r][c] == 'w') {
            return
        }else if (this.matrix[r][c] == 'c') {
            if (p == 0) this.player1Score++
            else this.player2Score++
        }
        
        this.matrix[this.players[p].r][this.players[p].c] = '.'
        this.players[p].r = r
        this.players[p].c = c
        let ch = '2'
        if (p == 0) {
            ch = '1'
        }
        this.matrix[this.players[p].r][this.players[p].c] = ch

    }

    movePlayer(player, dir) {
        player--
        player = player % 2
        switch (dir) {
            case 'up':
                if (this.players[player].r > 0)
                    this.changePlayerPosition(player, this.players[player].r - 1, this.players[player].c)
                break;

            case 'down':

                if (this.players[player].r <= this.matrix.length - 2)
                    this.changePlayerPosition(player, this.players[player].r + 1, this.players[player].c)
                break;

            case 'left':
                if (this.players[player].c > 0)
                    this.changePlayerPosition(player, this.players[player].r, this.players[player].c - 1)

                break;

            case 'right':

                if (this.players[player].c <= this.matrix[0].length - 2)
                    this.changePlayerPosition(player, this.players[player].r, this.players[player].c + 1)

                break;
            default:
                break;
        }
    }
}