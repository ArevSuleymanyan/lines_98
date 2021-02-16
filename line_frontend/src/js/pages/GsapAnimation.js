import {gsap} from 'gsap'

export default class GsapAnimation{
    homepage(p){
        gsap.from(p, 1.5, {opacity:0, duration: 2.5, ease: "elastic.out(1, 0.)", y: -500 })
    }

    navbarAnimation(array){
        let tl = gsap.timeline()
        tl.from(array, {opacity:0, stagger:0.5})
    }
    
    loginBoardAnimation(array){
        let tl = gsap.timeline()
        tl.from(array, {opacity:0, stagger:0.03, x:600})
    }
    gameGoardAnimation( array ){
        let tl = gsap.timeline()
        tl.from(array, 1, {opacity:0, })
    }
}

