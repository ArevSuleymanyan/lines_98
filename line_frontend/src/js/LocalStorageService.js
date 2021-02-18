export default class LocalStorageService {
  static getToken(token) {
    return localStorage.getItem(token);
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static removeToken(token) {
    localStorage.removeItem(token);
  }
}
