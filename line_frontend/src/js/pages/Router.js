import GsapAnimation from './GsapAnimation';

export default class Router {
  static guestScreen(array) {
    const navbar = document.getElementById('navbar');
    for (let i = 0; i < array.length; i += 1) {
      if (!array[i].isLogin) {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'font-weight-bold', 'text-white');
        btn.innerHTML = array[i].name;
        btn.addEventListener('click', () => array[i].handler());
        navbar.append(btn);
      }
    }
    const btn = document.querySelectorAll('.btn');
    GsapAnimation.navbarAnimation(btn);
  }

  static loginScreen(array) {
    const navbar = document.getElementById('navbar');
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].isLogin) {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'font-weight-bold', 'text-white');
        btn.innerHTML = array[i].name;
        btn.addEventListener('click', () => array[i].handler());
        navbar.append(btn);
      }
    }
  }

  static navigate(name) {
    const root = document.getElementById('root');
    while (root.firstElementChild) {
      root.removeChild(root.lastElementChild);
    }
    window.history.pushState('data', 'Title', `${name}`);
  }
}
