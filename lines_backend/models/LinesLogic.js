export default class LinesLogic {
    constructor() {
        this.resetData();
        this.colors = ['r', 'g', 'b', 'y', 'o'];
    }

    resetData() {
        this.board = [];
        for (let i = 0; i < 81; i+=1) {
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
                i+=1;
            }
        }
    }

    getRandomColors() {
        let i = 0;
        let randomColors = [];
        while (i < 3) {
            let r1 = Math.floor(Math.random() * this.colors.length);
            randomColors.push(this.colors[r1]);
            i+=1;
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
                i+=1;
            }
        }
    }

    checkColorsHorizontal(board, n = 3) {
        for (let i = 0; i < board.length - n; i+=1) {
            if (board[i].color) {
                let count = 0;
                for (let j = 0; j < n; j+=1) {
                    if (
                        board[i].color === board[i + j].color &&
                        parseInt(i / 9) === parseInt((i + j) / 9)
                    ) {
                        count+=1;
                    }
                }
                if (count === n) {
                    for (let j = 0; j < n; j+=1) {
                        board[i + j].color = '';
                        board[i + j].number = 0;
                    }
                }
            }
        }
    }

    checkColorsVertical(board, n = 3) {
        for (let i = 0; i <= board.length - (n - 1) * 9; i+=1) {
            if (board[i].color) {
                let count = 0;
                for (let j = 0; j < 9 * n; j += 9) {
                    if (board[i].color === board[i + j].color) {
                        count+=1;
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
        for (let i = 0; i < board.length - (n - 1) * 10; i+=1) {
            if (board[i].color) {
                let count = 0;
                for (let j = 0; j < n * 10; j += 10) {
                    if (board[i].color === board[i + j].color) {
                        count+=1;
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
        for (let i = 0; i < board.length - (n - 1) * 8; i+=1) {
            if (board[i].color) {
                let count = 0;
                for (let j = 0; j < n * 8; j += 8) {
                    if (board[i].color === board[i + j].color) {
                        count+=1;
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
        for (let i = 0; i < board.length; i+=1) {
            if (!board[i].color) {
                return false;
            }
        }
        return true;
    }

    moveTheColor(index1, index2, board) {
        if (board[index1].color && !board[index2].color) {
            this.checkStep(index1, 1, board);
            if (board[index2].number && board[index2].number > 0) {
                board[index2].color = board[index1].color;
                board[index2].number = -1;
                board[index1].color = '';
            }
        }
        for (let i = 0; i < board.length; i+=1) {
            if (!board[i].color) {
                board[i].number = 0;
            }
        }
    }

    checkStep(index, num, board) {
        board[index].number = num;
        if (index + 9 < 81 && !board[index + 9].number) {
            board[index + 9].number = num;
            this.checkStep(index + 9, num + 1, board);
        }

        if (index - 9 >= 0 && !board[index - 9].number) {
            board[index - 9].number = num;
            this.checkStep(index - 9, num + 1, board);
        }

        if (
            index + 1 < 81 &&
            !board[index + 1].number &&
            (index + 1) % 9 !== 0
        ) {
            board[index + 1].number = num;
            this.checkStep(index + 1, num + 1, board);
        }

        if (index - 1 >= 0 && !board[index - 1].number && index % 9 !== 0) {
            board[index - 1].number = num;
            this.checkStep(index - 1, num + 1, board);
        }
    }
}
