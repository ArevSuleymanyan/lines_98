export default class LinesLogic {
    constructor() {
        this.resetData();
        this.colors = ['r', 'g', 'b', 'y', 'o'];
    }

    resetData() {
        this.board = [];
        for (let i = 0; i < 81; i++) {
            this.board.push({
                color: '',
                number: 0,
            });
        }
    }

    runGame(board) {
        let i = 0;
        while (i < 3) {
            let r1 = Math.floor(Math.random() * this.colors.length);
            let r2 = Math.floor(Math.random() * board.length);
            if (!board[r2].color) {
                board[r2].color = this.colors[r1];
                i++;
            }
        }
    }

    getRandomColors() {
        let i = 0;
        let randomColors = [];
        while (i < 3) {
            let r1 = Math.floor(Math.random() * this.colors.length);
            randomColors.push(this.colors[r1]);
            i++;
        }
        return randomColors;
    }

    updateBoardColor(board) {
        let randomColors = this.getRandomColors();

        let i = 0;
        while (i < 3) {
            let r2 = Math.floor(Math.random() * board.length);

            if (!board[r2].color) {
                board[r2].color = randomColors[i];
                board[r2].number = -1;
                i++;
            }
        }
    }

    checkColorsHorizontal(board, n = 3) {
        for (let i = 0; i < board.length - n; i++) {
            if (board[i].color) {
                let count = 0;
                for (let j = 0; j < n; j++) {
                    if (
                        board[i].color === board[i + j].color &&
                        parseInt(i / 9) === parseInt((i + j) / 9)
                    ) {
                        count++;
                    }
                }
                if (count === n) {
                    for (let j = 0; j < n; j++) {
                        board[i + j].color = '';
                        board[i + j].number = 0;
                    }
                }
            }
        }
    }

    checkColorsVertical(board, n = 3) {
        for (let i = 0; i < board.length - (n - 1) * 9; i++) {
            if (board[i].color) {
                let count = 0;
                for (let j = 0; j < 9 * n; j += 9) {
                    if (board[i].color === board[i + j].color) {
                        count++;
                    }
                }
                if (count === n) {
                    for (let j = 0; j < n * 9; j += 9) {
                        board[i + j].color = '';
                        board[i + j].number = 0;
                    }
                }
            }
        }
    }

    checkColorsDiagonal(board, n = 3) {
        for (let i = 0; i < board.length - (n - 1) * 10; i++) {
            if (board[i].color) {
                let count = 0;
                for (let j = 0; j < n * 10; j += 10) {
                    if (board[i].color === board[i + j].color) {
                        count++;
                    }
                }
                if (count === n) {
                    for (let j = 0; j < n * 10; j += 10) {
                        board[i + j].color = '';
                        board[i + j].number = 0;
                    }
                }
            }
        }
        for (let i = 0; i < board.length - (n - 1) * 8; i++) {
            if (board[i].color) {
                let count = 0;
                for (let j = 0; j < n * 8; j += 8) {
                    if (board[i].color === board[i + j].color) {
                        count++;
                    }
                }
                if (count === n) {
                    for (let j = 0; j < n * 8; j += 8) {
                        board[i + j].color = '';
                        board[i + j].number = 0;
                    }
                }
            }
        }
    }

    checkEndGame(board) {
        for (let i = 0; i < board.length; i++) {
            if (!board[i].color) {
                return false;
            }
        }
        return true;
    }

    // showAnimation(fastestWay, callback) {
    //     const milliseconds = 1500;
    //     const cellDuration = milliseconds / fastestWay.length;
    //     let index = 0;
    //     intervalId = setInterval(function() {
    //         draw(fastestWay[index])
    //         index > 0 && undraw(fastestWay[index])
    //         index ++;
    //         if (index === fastestWay.length) {
    //             clearInterval(intervalId)
    //             callback();
    //         }
    //     }, cellDuration)
    // }

    changeColorLoc(index1, index2, board) {
        if (board[index1].color && !board[index2].color) {
            this.checkStep(index1, 1, board);
            if (board[index2].number && board[index2].number > 0) {
                // const fastestWay = findFastestRoud(board); 
                // showAnimation(fastestWay, () => {
                board[index2].color = board[index1].color;
                board[index2].number = -1;
                board[index1].color = '';
                // });
            }
        }
        for (let i = 0; i < board.length; i++) {
            if (!board[i].color) {
                board[i].number = 0;
            }
        }
    }

    checkStep(index, num, board) {
        board[index].number = num;
        if (
            index + 9 < 81 &&
            (!board[index + 9].number || board[index + 9].number > num)
        ) {
            board[index + 9].number = num;
            this.checkStep(index + 9, num + 1, board);
        }

        if (
            index - 9 >= 0 &&
            (!board[index - 9].number || board[index - 9].number > num)
        ) {
            board[index - 9].number = num;
            this.checkStep(index - 9, num + 1, board);
        }

        if (
            index + 1 < 81 &&
            (!board[index + 1].number || board[index + 1].number > num) &&
            (index + 1) % 9 !== 0
        ) {
            board[index + 1].number = num;
            this.checkStep(index + 1, num + 1, board);
        }

        if (
            index - 1 >= 0 &&
            (!board[index - 1].number || board[index - 1].number > num) &&
            index % 9 !== 0
        ) {
            board[index - 1].number = num;
            this.checkStep(index - 1, num + 1, board);
        }
    }
}
