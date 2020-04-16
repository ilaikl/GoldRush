class Matrix {

    constructor(rows, cols) {
        this.matrix = []
        if (rows && cols)
            this.generateMatrix(rows, cols)
    }

    generateMatrix(rows, cols) {

        let counter = 0
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = []
            for (let j = 0; j < cols; j++) {
                this.matrix[i][j] = counter++
            }
        }
    }

    print() {
        let str=''
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                str+=this.matrix[i][j] +"\t"
            }
            str +='\n'
        }
        console.log(str);
        
    }

    alter(c, r, val) {
        this.matrix[c][r] = val
    }

    getRowsLength(){
        return this.matrix.length
    }
    
    getColsLength(){
        return this.matrix[0].length
    }

    get(c, r) {
        if(c<0 || r<0 || c>=this.matrix.length || r>this.matrix[c].length)
            return 'err'
        return this.matrix[c][r]
    }

    findCoordinate(val) {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == val)
                    return { x: i, y: j }
            }
        }
        return "Not In Matrix"
    }
}