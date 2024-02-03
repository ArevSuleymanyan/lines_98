import BaseService from './BaseService';
import LocalStorageService from '../LocalStorageService.js';

export default class UserService extends BaseService {
  getUserInfo() {
    return this.runRequest(
      'http://localhost:3000/api/user',
      {
        method: 'GET',
      },
      LocalStorageService.getToken('token'),
    ).then((response) => response.json());
  }

  getGameInfo() {
    return this.runRequest(
      'http://localhost:3000/api/game',
      {
        method: 'GET',
      },
      LocalStorageService.getToken('token'),
    ).then((response) => response.json());
  }

  login(email, password) {
    return this.runRequest('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => response.json());
  }

  register(name, email, password, confirmPassword) {
    return this.runRequest('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    }).then((response) => response.json());
  }

  addGame(id, board) {
    const token = LocalStorageService.getToken('token');
    this.setConfig({ token });
    return this.runRequest('http://localhost:3000/api/board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        board,
      }),
    },
    LocalStorageService.getToken('token')).then((response) => response.json());
  }
}
