let gameInstance = null;
export default class GameModel {
  constructor() {
    if (!gameInstance) {
      gameInstance = this;
    }

    this.user = null;
    this.game = [];
    this.isLogin = false;

    return gameInstance;
  }
}
