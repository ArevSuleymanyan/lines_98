import GsapAnimation from '../pages/GsapAnimation.js';
import UserService from '../services/UserService.js';
import LinesLogic from './LinesLogic.js';
import gameModel from './models/index.js'
const linesLogic = new LinesLogic();
const userService = new UserService();
const gsapAnimation = new GsapAnimation()
export default class GameView {
    constructor() {
        this.initCell = {
            color: '',
            id_1: '',
            id_2: '',
        };
    }

    runGame(board, div) {
        this.createGameBord(board, div);

        let cell = document.querySelectorAll('.cell');
        gsapAnimation.gameGoardAnimation( cell)
    }

    createGameBord(board, div) {
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

    clickHandler(board, e) {
        let id = +e.target.id;
        if (board[id].color ) {   
            this.initCell.color = board[id].color;
            this.initCell.id_1 = id;
        }
        if (!board[id].color && this.initCell.color) {
            this.initCell.id_2 = id;
            linesLogic.changeColorLoc(
                this.initCell.id_1,
                this.initCell.id_2,
                board
            );
            if (!board[this.initCell.id_2].color) {
                this.initCell.color = '';
                this.initCell.id_1 = '';
                this.initCell.id_2 = '';
                return;
            } else {
                this.initCell.color = '';
                this.initCell.id_1 = '';
                this.initCell.id_2 = '';
                linesLogic.updateBoardColor(board);

                this.viewUpdate(board);
                linesLogic.checkColorsHorizontal(board);
                linesLogic.checkColorsVertical(board);
                linesLogic.checkColorsDiagonal(board);
                this.viewUpdate(board);
                if(linesLogic.checkEndGame(board)){
                    alert('Game Over');
                }
            }
        }
    }

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
        // debugger;
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
            console.log(board)
    }

    async saveClickHandler(e, board) {
        
        let id = gameModel.user.id;
        let res = await userService.addGame(id, board);
        alert(res.message);
        window.location.replace('home');
    }
}
