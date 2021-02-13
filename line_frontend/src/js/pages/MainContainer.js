import Handlers from './Handlers.js';
import LocalStorageService from '../LocalStorageService.js';
import gameModel from '../game/models/index.js';
import GsapAnimation from './GsapAnimation.js';

const localStorageService = new LocalStorageService();
const handlers = new Handlers();
const gsapAnimation = new GsapAnimation()
export default class MainContainer {
    homeGuestContainer() {
        this.clearRoot();
        const root = document.getElementById('root');
        let p = document.createElement('p');
        p.innerHTML = 'Please log in...';
        p.classList.add('p');
        gsapAnimation.homepage(p)
        root.append(p);
    }

    loginContainer() {
        this.clearRoot();
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
                handlers.loginHandler(email.value, password.value);
            }
        });
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-secondary', 'btn-lg');
        btn.innerHTML = 'ENTER';
        btn.addEventListener('click', () =>
            handlers.loginHandler(email.value, password.value)
        );

        const emailLbl = document.createElement('label');
        emailLbl.innerHTML = 'email';
        emailLbl.classList.add('form-label', 'fst-italic');
        const passwordLbl = document.createElement('label');
        passwordLbl.innerHTML = 'password';
        passwordLbl.classList.add('form-label', 'fst-italic');

        wrapper.append(emailLbl);
        wrapper.append(email);
        wrapper.append(passwordLbl);
        wrapper.append(password);
        wrapper.append(btn);

        root.append(wrapper);
    }

    registerContainer() {
        this.clearRoot();
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
        btn.addEventListener('click', () =>
            handlers.registerHandler(
                name.value,
                email.value,
                password.value,
                confirmPassword.value
            )
        );
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

        wrapper.append(nameLbl);
        wrapper.append(name);
        wrapper.append(emailLbl);
        wrapper.append(email);
        wrapper.append(passwordLbl);
        wrapper.append(password);
        wrapper.append(confirmPasswordLbl);
        wrapper.append(confirmPassword);
        wrapper.append(btn);

        root.append(wrapper);
    }

    homeContainer() {
        this.clearRoot();
        let user = gameModel.user;
        const root = document.getElementById('root');
        const p = document.createElement('p');
        p.innerHTML = `Welcome home page ${user.name}`;
        p.classList.add('p');
        root.append(p);
    }

    playContainer() {
        this.clearRoot();
        handlers.playGameHandler();
    }

    logoutContainer() {
        this.clearRoot();
        gameModel.user = null;
        gameModel.game = [];
        gameModel.isLogin = false;
        localStorageService.removeToken('token');
        window.location.replace('homeguest');
    }

    clearRoot() {
        const root = document.getElementById('root');
        while (root.firstElementChild) {
            root.removeChild(root.lastElementChild);
        }
    }
}
