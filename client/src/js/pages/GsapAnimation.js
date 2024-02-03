import { gsap } from 'gsap';

export default class GsapAnimation {
  static homepage(p) {
    gsap.from(p, 1.5, {
      opacity: 0,
      duration: 2.5,
      ease: 'elastic.out(1, 0.)',
      y: -500,
    });
  }

  static navbarAnimation(array) {
    const tl = gsap.timeline();
    tl.from(array, { opacity: 0, stagger: 0.5 });
  }

  static loginBoardAnimation(array) {
    const tl = gsap.timeline();
    tl.from(array, { opacity: 0, stagger: 0.02, y: -100 });
  }

  static gameBoardAnimation(array) {
    const tl = gsap.timeline();
    tl.from(array, 0.5, { opacity: 0, y: -100, stagger: 0.01 });
  }

  static btnAnimation(array) {
    const tl = gsap.timeline();
    tl.from(array, 3, {
      opacity: 0,
      ease: 'bounce.out',
      y: -300,
      stagger: 0.3,
    });
  }
}
