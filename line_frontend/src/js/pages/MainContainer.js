import Handlers from './Handlers.js';
import LocalStorageService from '../LocalStorageService.js';
import gameModel from '../game/models/index.js';
import GsapAnimation from './GsapAnimation.js';

export default class MainContainer {
  homeGuestContainer() {
    this.constructor.clearRoot();
    const root = document.getElementById('root');
    const p = document.createElement('p');
    p.innerHTML = 'Please log in...';
    p.classList.add('p');
    GsapAnimation.homepage(p);
    root.append(p);
  }

  loginContainer() {
    this.constructor.clearRoot();
    const root = document.getElementById('root');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const email = document.createElement('input');
    email.classList.add('mb-3', 'form-control');
    email.setAttribute('type', 'text');

    const password = document.createElement('input');
    password.classList.add('mb-3', 'form-control');
    password.setAttribute('type', 'password');
    password.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        Handlers.loginHandler(email.value, password.value);
      }
    });
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-secondary', 'btn-lg');
    btn.innerHTML = 'ENTER';
    btn.addEventListener('click', () => Handlers.loginHandler(email.value, password.value));

    const emailLbl = document.createElement('label');
    emailLbl.innerHTML = 'email';
    emailLbl.classList.add('form-label', 'fst-italic');
    const passwordLbl = document.createElement('label');
    passwordLbl.innerHTML = 'password';
    passwordLbl.classList.add('form-label', 'fst-italic');

    const elements = [emailLbl, email, passwordLbl, password, btn];
    for (let i = 0; i < elements.length; i += 1) {
      wrapper.append(elements[i]);
    }
    GsapAnimation.loginBoardAnimation(elements);
    root.append(wrapper);
  }

  registerContainer() {
    this.constructor.clearRoot();
    const root = document.getElementById('root');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const name = document.createElement('input');
    name.classList.add('mb-3', 'form-control');
    name.setAttribute('type', 'text');

    const email = document.createElement('input');
    email.classList.add('mb-3', 'form-control');
    email.setAttribute('type', 'text');

    const password = document.createElement('input');
    password.classList.add('mb-3', 'form-control');
    password.setAttribute('type', 'password');

    const confirmPassword = document.createElement('input');
    confirmPassword.classList.add('mb-3', 'form-control');
    confirmPassword.setAttribute('type', 'password');

    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-secondary', 'btn-lg');
    btn.addEventListener('click', () => Handlers.registerHandler(
      name.value,
      email.value,
      password.value,
      confirmPassword.value,
    ));
    btn.innerHTML = 'ENTER';

    const nameLbl = document.createElement('label');
    nameLbl.innerHTML = 'name';
    nameLbl.classList.add('form-label', 'fst-italic');
    const emailLbl = document.createElement('label');
    emailLbl.innerHTML = 'email';
    emailLbl.classList.add('form-label', 'fst-italic');
    const passwordLbl = document.createElement('label');
    passwordLbl.innerHTML = 'password';
    passwordLbl.classList.add('form-label', 'fst-italic');
    const confirmPasswordLbl = document.createElement('label');
    confirmPasswordLbl.innerHTML = 'confirm password';
    confirmPasswordLbl.classList.add('form-label', 'fst-italic');

    const elements = [
      nameLbl,
      name,
      emailLbl,
      email,
      passwordLbl,
      password,
      confirmPasswordLbl,
      confirmPassword,
      btn,
    ];
    for (let i = 0; i < elements.length; i += 1) {
      wrapper.append(elements[i]);
    }
    GsapAnimation.loginBoardAnimation(elements);
    root.append(wrapper);
  }

  homeContainer() {
    this.constructor.clearRoot();
    const { user } = gameModel;
    const root = document.getElementById('root');
    const p = document.createElement('p');
    p.innerHTML = `Welcome home page ${user.name}`;
    p.classList.add('p');
    root.append(p);
  }

  playContainer() {
    this.constructor.clearRoot();
    Handlers.playGameHandler();
  }

  logoutContainer() {
    this.constructor.clearRoot();
    gameModel.user = null;
    gameModel.game = [];
    gameModel.isLogin = false;
    LocalStorageService.removeToken('token');
    window.location.replace('homeguest');
  }

  static clearRoot() {
    const root = document.getElementById('root');
    while (root.firstElementChild) {
      root.removeChild(root.lastElementChild);
    }
  }
}
