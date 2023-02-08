import { refs } from './refs';

export class Loader {
  show() {
    refs.preloader.classList.remove('is-hidden');
  }

  hide() {
    refs.preloader.classList.add('is-hidden');
  }
}
