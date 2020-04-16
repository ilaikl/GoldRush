class Stack {
    constructor() {
        this.stack = []
        this.length = 0
    }
    push(x) {
        this.stack[this.length] = x
        this.length++
    }
    isEmpty() {
        if (this.stack.length === 0)
            return true
        return false
    }
    peek() {
        return(this.stack[this.length - 1]);
    }
    pop() {
        if(this.length>0){
            let returned = this.stack.splice(this.length - 1)
            this.length--
            return returned
        }
        return false
    }
    print(){
        console.log(this.stack);
    }
}
