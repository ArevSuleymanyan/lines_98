export default class LinesLogic {
  constructor() {
    this.resetData();
    this.colors = ['r', 'g', 'b', 'y', 'o'];
  }

  resetData() {
    this.board = [];
    for (let i = 0; i < 81; i += 1) {
      this.board.push({
        color: '',
        number: 0,
      });
    }
  }

  runGame(board) {
    let i = 0;
    while (i < 3) {
      const r1 = Math.floor(Math.random() * this.colors.length);
      const r2 = Math.floor(Math.random() * board.length);
      if (!board[r2].color) {
        board[r2].color = this.colors[r1];
        i += 1;
      }
    }
  }

  getRandomColors() {
    let i = 0;
    const randomColors = [];
    while (i < 3) {
      const r1 = Math.floor(Math.random() * this.colors.length);
      randomColors.push(this.colors[r1]);
      i += 1;
    }
    return randomColors;
  }

  updateBoardColor(board) {
    const randomColors = this.getRandomColors();
    const emptyCells = [];
    for (let j = 0; j < board.length; j += 1) {
      if (!board[j].color) {
        emptyCells.push(j);
      }
    }

    for (let i = 0; i < randomColors.length;) {
      const r = Math.floor(Math.random() * emptyCells.length);
      if (!board[emptyCells[r]].color) {
        board[emptyCells[r]].color = randomColors[i];
        board[emptyCells[r]].number = -1;
        i += 1;
      }
    }
  }

  static checkColorsHorizontal(board, n = 3) {
    for (let i = 0; i < board.length - n; i += 1) {
      if (board[i].color) {
        let count = 0;
        for (let j = 0; j < n; j += 1) {
          if (
            board[i].color === board[i + j].color
                        && parseInt(i / 9, 10) === parseInt((i + j) / 9, 10)
          ) {
            count += 1;
          }
        }
        if (count === n) {
          for (let j = 0; j < n; j += 1) {
            board[i + j].color = '';
            board[i + j].number = 0;
          }
        }
      }
    }
  }

  static checkColorsVertical(board, n = 3) {
    for (let i = 0; i < board.length - (n - 1) * 9; i += 1) {
      if (board[i].color) {
        let count = 0;
        for (let j = 0; j < 9 * n; j += 9) {
          if (board[i].color === board[i + j].color) {
            count += 1;
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

  static checkColorsDiagonal(board, n = 3) {
    for (let i = 0; i < board.length - (n - 1) * 10; i += 1) {
      if (board[i].color) {
        let count = 0;
        for (let j = 0; j < n * 10; j += 10) {
          if (board[i].color === board[i + j].color) {
            count += 1;
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
    for (let i = 0; i < board.length - (n - 1) * 8; i += 1) {
      if (board[i].color) {
        let count = 0;
        for (let j = 0; j < n * 8; j += 8) {
          if (board[i].color === board[i + j].color) {
            count += 1;
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

  static checkEndGame(board) {
    for (let i = 0; i < board.length; i += 1) {
      if (!board[i].color) {
        return false;
      }
    }
    return true;
  }

  static showAnimation(color, fastestWay, callback) {
    // const milliseconds = 1500;
    // const cellDuration = milliseconds / fastestWay.length;
    const cellDuration = 160;
    let index = 0;

    const intervalId = setInterval(function () {
      const item = document.getElementById(fastestWay[index]);
      item.classList.add(color);
      if (index > 0) {
        const elem = document.getElementById(fastestWay[index - 1]);
        elem.classList.remove(color);
      }
      index += 1;
      if (index === fastestWay.length) {
        clearInterval(intervalId);
        callback();
      }
    }, cellDuration);
  }

  moveTheColor(index1, index2, color, board) {
    this.checkStep(index1, 1, board);
    if (board[index2].number > 0) {
      const way = [index2];
      const fastestWay = this.findFastestRoud(
        board,
        index2,
        board[index2].number,
        way,
      );
      fastestWay.reverse();

      this.constructor.showAnimation(color, fastestWay, () => {
        board[index2].color = board[index1].color;
        board[index2].number = -1;
        board[index1].color = '';
        board[index1].number = 0;
        this.updateBoardColor(board);
        this.constructor.checkColorsHorizontal(board);
        this.constructor.checkColorsVertical(board);
        this.constructor.checkColorsDiagonal(board);
        for (let i = 0; i < board.length; i += 1) {
          const item = document.getElementById(i);
          const classNames = item.classList;
          if (!board[i].color && classNames.length === 2) {
            item.classList.remove(classNames[1]);
          }
          if (board[i].color && classNames.length === 1) {
            item.classList.add(board[i].color);
            board[i].number = -1;
          }
        }
      });

      for (let i = 0; i < board.length; i += 1) {
        if (!board[i].color) {
          board[i].number = 0;
        }
      }
    }
  }

  findFastestRoud(board, index, count, way) {
    if (index + 9 < 81 && count - board[index + 9].number === 1) {
      way.push(index + 9);
      this.findFastestRoud(board, index + 9, count - 1, way);
    } else if (index - 9 >= 0 && count - board[index - 9].number === 1) {
      way.push(index - 9);

      this.findFastestRoud(board, index - 9, count - 1, way);
    } else if (
      index + 1 < 81
            && (index + 1) % 9 !== 0
            && count - board[index + 1].number === 1
    ) {
      way.push(index + 1);

      this.findFastestRoud(board, index + 1, count - 1, way);
    } else if (
      index - 1 >= 0
            && index % 9 !== 0
            && count - board[index - 1].number === 1
    ) {
      way.push(index - 1);

      this.findFastestRoud(board, index - 1, count - 1, way);
    }
    return way;
  }

  checkStep(index, num, board) {
    board[index].number = num;
    if (
      index + 9 < 81
            && (!board[index + 9].number || board[index + 9].number > num)
    ) {
      board[index + 9].number = num;
      this.checkStep(index + 9, num + 1, board);
    }

    if (
      index - 9 >= 0
            && (!board[index - 9].number || board[index - 9].number > num)
    ) {
      board[index - 9].number = num;
      this.checkStep(index - 9, num + 1, board);
    }

    if (
      index + 1 < 81
            && (!board[index + 1].number || board[index + 1].number > num)
            && (index + 1) % 9 !== 0
    ) {
      board[index + 1].number = num;
      this.checkStep(index + 1, num + 1, board);
    }

    if (
      index - 1 >= 0
            && (!board[index - 1].number || board[index - 1].number > num)
            && index % 9 !== 0
    ) {
      board[index - 1].number = num;
      this.checkStep(index - 1, num + 1, board);
    }
  }
}
