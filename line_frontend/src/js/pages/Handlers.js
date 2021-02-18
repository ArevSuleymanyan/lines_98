import UserService from '../services/UserService.js';
import GameView from '../game/GameView.js';
import LocalStorageService from '../LocalStorageService.js';
import gameModel from '../game/models/index.js';

const gameView = new GameView();
const userService = new UserService();
const root = document.getElementById('root');

export default class Handlers {
  static async playGameHandler() {
    const token = LocalStorageService.getToken('token');
    userService.setConfig({ token });
    const game = await userService.getGameInfo();
    gameModel.game = game;
    gameView.runGame(game, root);
  }

  static async loginHandler(email, password) {
    if (!email || !password) {
      alert('Please provide an email and password');
      return;
    }
    const user = await userService.login(email, password);
    if (user.message) {
      alert(user.message);
      return;
    }
    const { token } = user;
    LocalStorageService.setToken(token);
    gameModel.isLogin = true;
    window.location.replace('home');
  }

  static async registerHandler(name, email, password, confirmPassword) {
    if (!name || !email || !password || !confirmPassword) {
      alert('Fill in all the fields');
      return;
    }

    const regName = /^[a-zA-Z]+[a-zA-Z]{2,15}$/;
    if (!regName.test(name)) {
      alert(
        `Length is more than 3 characters.
                 Тhe name must start with a letter.
                 a-z, A-Z, 0-9, _-.
                 `,
      );
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const regPass = /[a-zA-Z0-9]{4,}/;
    if (!regPass.test(password)) {
      alert(`Password is short
            Length is more than 4 characters.
            a-z, A-Z, 0-9,
            `);
      return;
    }

    const result = await userService.register(
      name,
      email,
      password,
      confirmPassword,
    );
    if (result.message === 'User registered') {
      alert(result.message);
      window.location.replace('login');
    } else {
      alert(result.message);
    }
  }
}
