import { refs } from './refs';

let observer = new IntersectionObserver(callback);

observer.observe(refs.footer);

function callback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      refs.upBtn.classList.remove('visually-hidden');
    } else {
      refs.upBtn.classList.add('visually-hidden');
    }
  });
}
