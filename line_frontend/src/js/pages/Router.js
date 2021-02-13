import GsapAnimation from "./GsapAnimation";
const gsapAnimation = new GsapAnimation() 
export default class Router {
    
    guestScreen(array) {
        const navbar = document.getElementById('navbar');
        for (let i = 0; i < array.length; i++) {
            if(!array[i].isLogin){
                let btn = document.createElement('button');
                btn.classList.add('btn', 'font-weight-bold','text-white');
                btn.innerHTML = array[i].name;
                btn.addEventListener('click', () => array[i].handler());
                navbar.append(btn);
            }
        }
        let btn = document.querySelectorAll('.btn');
        gsapAnimation.navbarAnimation(btn);
    }

    loginScreen(array) {
        const navbar = document.getElementById('navbar');
        for (let i = 0; i < array.length; i++) {
            if(array[i].isLogin){
                let btn = document.createElement('button');
                btn.classList.add('btn', 'font-weight-bold','text-white');
                btn.innerHTML = array[i].name;
                btn.addEventListener('click', () => array[i].handler());
                navbar.append(btn);
            }
        }
    }

    navigate(name) {
        const root = document.getElementById('root');
        while (root.firstElementChild) {
            root.removeChild(root.lastElementChild);
        }
        window.history.pushState('data', 'Title', `${name}`);
        
    }
}

