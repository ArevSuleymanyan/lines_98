import '../scss/app.scss';
import Router from './pages/Router';
import UserService from './services/UserService.js';
import MainContainer from './pages/MainContainer.js';
import LocalStorageService from './LocalStorageService.js';
import gameModel from './game/models/index.js'


const router = new Router();
const userService = new UserService();
const mainContainer = new MainContainer();
const localStorageService = new LocalStorageService();

function navigate(name) {
    router.navigate(name);
    renderPage(name);
}
const homeGuest = () => navigate('homeguest');
const login = () => navigate('login');
const register = () => navigate('register');
const loginHome = () => navigate('home');
const play = () => navigate('play');
const logout = () => navigate('logout');


const header = [
    { name: 'HomeGuest', handler: homeGuest, isLogin: false },
    { name: 'Login', handler: login, isLogin: false },
    { name: 'Register', handler: register, isLogin: false },
    { name: 'Home', handler: loginHome, isLogin: true },
    { name: 'Play', handler: play, isLogin: true },
    { name: 'Log out', handler: logout, isLogin: true },
];

async function checkIsLogined() {
    const token = localStorageService.getToken('token');
    let page = window.location.href.split('/');
    page = page[page.length - 1];
    if (!token) {
        gameModel.isLogin = false;
        renderPage(page);
    }
    userService.setConfig({ token });
    try {
        const user = await userService.getUserInfo();
        if (user && user.id) {
            gameModel.user = user;
            router.loginScreen(header);
            gameModel.isLogin = true;
            renderPage(page);
            return;
        }
        gameModel.isLogin = false;
        router.guestScreen(header);
        renderPage(page);
    } catch (error) {
        router.guestScreen(header);
        gameModel.isLogin = false;
        renderPage(page);
        console.log(error.message);
    }
}

function renderPage(name) {
    if (!gameModel.isLogin && ['play', 'home'].indexOf(name) != -1) {
        name = 'login';
    }
    if(gameModel.isLogin && ['login', 'register'].indexOf(name) != -1){
        name = 'home';
    }

    switch (name) {
        case 'homeguest':
            mainContainer.homeGuestContainer();
            break;
        case 'login':
            mainContainer.loginContainer();
            break;
        case 'register':
            mainContainer.registerContainer();
            break;
        case 'home':
            mainContainer.homeContainer();
            break;
        case 'play':
            mainContainer.playContainer();
            break;
        case 'logout':
            mainContainer.logoutContainer();
            break;
        default:
            mainContainer.homeGuestContainer();
    }
}

checkIsLogined();
