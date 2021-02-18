import GsapAnimation from '../pages/GsapAnimation.js';
import UserService from '../services/UserService.js';
import LinesLogic from './LinesLogic.js';
import gameModel from './models/index.js';
const linesLogic = new LinesLogic();
const userService = new UserService();
const gsapAnimation = new GsapAnimation();
export default class GameView {
    constructor() {
        this.initCell = {
            color: '',
            id_1: '',
            id_2: '',
        };
    }

    runGame(board, div) {
        // this.createLevelBoard(board, div);
        this.createGameBoard(board, div);
        let cell = document.querySelectorAll('.cell');
        gsapAnimation.gameGoardAnimation(cell);
    }

    // createLevelBoard(board, div) {
    //     let levelBoard = document.createElement('div');
    //     levelBoard.classList.add('level');
    //     let box1 = document.createElement('div');
    //     box1.classList.add('box1');
    //     box1.innerHTML = 'LEVEL';
    //     let box2 = document.createElement('div');
    //     box2.classList.add('box2');
    //     for (let i = 0; i < 3; i++) {
    //         let btn = document.createElement('button');
    //         btn.classList.add('btn', 'btn-dark', 'levelBtn');
    //         btn.addEventListener('click', () =>
    //             this.levelChangeHandler(board, div, i + 1)
    //         );
    //         btn.innerHTML = i + 1;
    //         box2.append(btn);
    //     }
    //     levelBoard.append(box1, box2);
    //     div.append(levelBoard);
    //     let levelBtn = document.querySelectorAll('.levelBtn');
    //     gsapAnimation.btnAnimation(levelBtn);
    // }

    createGameBoard(board, div) {
        let n = 0;
        for (let i = 0; i < 9; i++) {
            let line = document.createElement('div');
            line.classList.add('line');
            for (let j = 0; j < 9; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('id', n);
                cell.addEventListener('click', (e) =>
                    this.clickHandler(board, e)
                );
                line.append(cell);
                n++;
            }
            div.append(line);
        }
        let btnWrap = document.createElement('div');
        btnWrap.classList.add('btnWrap');

        let reload = document.createElement('button');
        reload.innerHTML = 'Reload';
        reload.addEventListener('click', () => this.reloadClickHandler(board));
        reload.classList.add('btn', 'btn-secondary', 'r-s');

        let save = document.createElement('button');
        save.innerHTML = 'Save';
        save.addEventListener('click', (e) => this.saveClickHandler(e, board));
        save.classList.add('btn', 'btn-success', 'r-s');

        btnWrap.append(reload, save);
        div.append(btnWrap);

        linesLogic.runGame(board);
        this.viewUpdate(board);
    }

    clickHandler(board, e,) {
        let id = Number(e.target.id);
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
            if (linesLogic.checkEndGame(board)) {
                alert('Game Over');
            }
        }
    }
    // levelChangeHandler() {
       
    // }

    viewUpdate(board) {
        for (let i = 0; i < board.length; i++) {
            let item = document.getElementById(i);
            let classNames = item.classList;
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
        for (let i = 0; i < board.length; i++) {
            let item = document.getElementById(i);
            let classNames = item.classList;
            if (classNames.length === 2) {
                item.classList.remove(classNames[1]);
            }
            board[i].color = '';
            board[i].number = 0;
        }
        linesLogic.updateBoardColor(board);
        this.viewUpdate(board);
        console.log(board);
    }

    async saveClickHandler(e, board) {
        let id = gameModel.user.id;
        let res = await userService.addGame(id, board);
        alert(res.message);
        window.location.replace('home');
    }
}
