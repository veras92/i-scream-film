import { refs } from './refs';

let observer = new IntersectionObserver(callback);

observer.observe(refs.footer);

function callback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      refs.heart.classList.add('animation');
    } else {
      refs.heart.classList.remove('animation');
    }
  });
}
