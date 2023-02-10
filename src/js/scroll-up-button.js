import { refs } from './refs';

let observer = new IntersectionObserver(callback);

observer.observe(refs.footer);

function callback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      refs.upBtn.classList.remove('is-hidden');
    } else {
      refs.upBtn.classList.add('is-hidden');
    }
  });
}
