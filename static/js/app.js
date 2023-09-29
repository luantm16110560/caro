new Vue({
    el: "#app",
    data: {
        number: 25,
        matrix: [],
        isTurnX: true,
        histories:[],
        hasPlayerWon: false
    },
    methods: {
        createMatrix: function () {
            this.matrix = [];
            for (let i = 0; i < this.number; i++) {
                const row = [];
                for (let j = 0; j < this.number; j++) {
                    row.push(-1);
                }
                this.matrix.push(row);
            }
        },
        selectButton: function (row, col) {
            if (this.isTurnX) {
                Vue.set(this.matrix[row], col, 1);
            } else {
                Vue.set(this.matrix[row], col, 0);
            }
            this.histories.unshift((this.isTurnX ? 'x':'o') + ' :' +row + '_' + col)
            const result = this.checkWin()
            if(result !== -1){
                this.hasPlayerWon = true
                if(result == 1){
                    setTimeout(() => {
                        alert('Player X Won')
                    }, 100);
                }
                else if(result == 0){
                    setTimeout(() => {
                        alert('Player O Won')
                    }, 100);
                }
            }
            else{
                this.isTurnX = !this.isTurnX;
            }
        },
        
        reset: function(){
            this.histories = [];
            this.hasPlayerWon = false;
            this.createMatrix();
        },
        checkWin: function(){
            const length = this.number
            const matrix = this.matrix
            // Kiểm tra hàng ngang
            for (let row = 0; row < length; row++) {
                for (let col = 0; col <= length - 5; col++) {
                    const player = matrix[row][col];
                    if (player !== -1 &&
                        player === matrix[row][col + 1] &&
                        player === matrix[row][col + 2] &&
                        player === matrix[row][col + 3] &&
                        player === matrix[row][col + 4]) {
                        return player;  // Người chơi player thắng
                    }
                }
            }
            // Kiểm tra hàng dọc
            for (let row = 0; row <= length - 5; row++) {
                for (let col = 0; col < length; col++) {
                    const player = matrix[row][col];
                    if (player !== -1 &&
                        player === matrix[row + 1][col] &&
                        player === matrix[row + 2][col] &&
                        player === matrix[row + 3][col] &&
                        player === matrix[row + 4][col]) {
                        return player;  // Người chơi player thắng
                    }
                }
            }
            // Kiểm tra đường chéo chính
            for (let row = 0; row <= length - 5; row++) {
                for (let col = 0; col <= length - 5; col++) {
                    const player = matrix[row][col];
                    if (player !== -1 &&
                        player === matrix[row + 1][col + 1] &&
                        player === matrix[row + 2][col + 2] &&
                        player === matrix[row + 3][col + 3] &&
                        player === matrix[row + 4][col + 4]) {
                        return player;  // Người chơi player thắng
                    }
                }
            }
            // Kiểm tra đường chéo phụ
            for (let row = 0; row <= length - 5; row++) {
                for (let col = 4; col < length; col++) {
                    const player = matrix[row][col];
                    if (player !== -1 &&
                        player === matrix[row + 1][col - 1] &&
                        player === matrix[row + 2][col - 2] &&
                        player === matrix[row + 3][col - 3] &&
                        player === matrix[row + 4][col - 4]) {
                        return player;  // Người chơi player thắng
                    }
                }
            }
            return -1
        }
    },
    mounted: function () {
        this.createMatrix();
    },
    watch: {
        number: function (newVal) {
            if (this.number > maxNumber) {
                alert("The max number is 35");
                this.number = maxNumber;
            } else {
                if (newVal.includes(".")) {
                    alert("Input integer");
                    this.number = parseInt(newVal);
                } else {
                    this.number = newVal;
                }
            }
            this.createMatrix();
        },
    },
});