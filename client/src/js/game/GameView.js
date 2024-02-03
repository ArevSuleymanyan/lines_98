import GsapAnimation from '../pages/GsapAnimation.js';
import UserService from '../services/UserService.js';
import LinesLogic from './LinesLogic.js';
import gameModel from './models/index.js';

const linesLogic = new LinesLogic();
const userService = new UserService();

export default class GameView {
  constructor() {
    this.initCell = {
      color: '',
      id_1: '',
      id_2: '',
    };
  }

  runGame(board, div) {
    console.log(board)
    this.createGameBoard(board, div);
    const cell = document.querySelectorAll('.cell');
    GsapAnimation.gameBoardAnimation(cell);
  }

  createGameBoard(board, div) {
    let n = 0;
    for (let i = 0; i < 9; i += 1) {
      const line = document.createElement('div');
      line.classList.add('line');
      for (let j = 0; j < 9; j += 1) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', n);
        cell.addEventListener('click', (e) => this.clickHandler(board, e));
        line.append(cell);
        n += 1;
      }
      div.append(line);
    }
    const btnWrap = document.createElement('div');
    btnWrap.classList.add('btnWrap');

    const reload = document.createElement('button');
    reload.innerHTML = 'Reload';
    reload.addEventListener('click', () => this.reloadClickHandler(board));
    reload.classList.add('btn', 'btn-secondary', 'r-s');

    const save = document.createElement('button');
    save.innerHTML = 'Save';
    save.addEventListener('click', () => this.constructor.saveClickHandler(board));
    save.classList.add('btn', 'btn-success', 'r-s');

    btnWrap.append(reload, save);
    div.append(btnWrap);

    linesLogic.runGame(board);
    this.constructor.viewUpdate(board);
  }

  clickHandler(board, e) {
    const id = Number(e.target.id);
    if (board[id].color) {
      this.initCell.id_1 = id;
      this.initCell.color = board[id].color;
    }
    if (!board[id].color && this.initCell.color) {
      this.initCell.id_2 = id;
      linesLogic.moveTheColor(
        this.initCell.id_1,
        this.initCell.id_2,
        this.initCell.color,
        board,
      );

      if (!board[this.initCell.id_2].color) {
        this.initCell.color = '';
        this.initCell.id_1 = '';
        this.initCell.id_2 = '';
        return;
      }
      if (LinesLogic.checkEndGame(board)) {
        alert('Game Over');
      }
    }
  }

  static viewUpdate(board) {
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
  }

  reloadClickHandler(board) {
    for (let i = 0; i < board.length; i += 1) {
      const item = document.getElementById(i);
      const classNames = item.classList;
      if (classNames.length === 2) {
        item.classList.remove(classNames[1]);
      }
      board[i].color = '';
      board[i].number = 0;
    }
    linesLogic.updateBoardColor(board);
    this.constructor.viewUpdate(board);
  }

  static async saveClickHandler(board) {
    const { id } = gameModel.user;
    const res = await userService.addGame(id, board);
    alert(res.message);
    window.location.replace('home');
  }
}
