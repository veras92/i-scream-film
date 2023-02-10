import { FimlsApi } from './film-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showLoader, hideLoader } from './loader';
import { auth, checkFilmInDB } from './firebase';

import {
  getGenresList,
  getFullYear,
  getRaiting,
  converTittle,
  getSrc,
} from './cardsInfoCoverter';

const closeModalBtn = document.querySelector('.btn-modal');
const backdrop = document.querySelector('.js-backdrop');
const listLibrary = document.querySelector('.js-gallery');
const cinemaCardWraper = document.querySelector('.modal-window');

listLibrary.addEventListener('click', onCardClick);
closeModalBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

const filmsApi = new FimlsApi();

async function onCardClick({ target }) {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal');

  const card = target.closest('.card');
  if (card) {
    const id = card.dataset.id;
    try {
      showLoader();
      const data = await filmsApi.getFilmById(id);
      console.log(data);
      renderModalWindow(data);
      // =============  перевірка
      const cinemaInfoEl = document.querySelector('.cinema-info');
      const movieId = cinemaInfoEl.getAttribute('data-id');
      getUserId(movieId);

      //==================
    } catch (err) {
      Notify.failure(err.message);
    } finally {
      hideLoader();
    }
  }
}

function renderModalWindow(data) {
  data.popularity = Math.round(data.popularity);
  data.vote_average = data.vote_average.toFixed(1);
  cinemaCardWraper.innerHTML = `
  <button type="button" class="btn-modal" data-modal-close>
     
    </button>
 <div class="cinema-img">
 <img src="/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg" />
 </div>
 <div class="cinema-info" data-id=${data.id}>
  <h1 class="cinema-info_item">${data.title}</h1>
  <div class="cinema-info__list">
    <div class="cinema-attribute">
      <p class="cinema-atrtribute_item">Vote / Votes</p>
      <p class="cinema-atrtribute_item">Popularity</p>
      <p class="cinema-atrtribute_item">Original Title</p>
      <p class="cinema-atrtribute_item">Genre</p>
    </div>
    <div class="cinema-attrebute_value">
      <p class="cinema-attrebute_value__item">${data.vote_average} / ${data.vote_count}</p>
      <p class="cinema-attrebute_value__item">${data.popularity}</p>
      <p class="cinema-attrebute_value__item">${data.title}</p>
      <p class="cinema-attrebute_value__item">Ganrs</p>
    </div>
  </div>
  <div class="cinema-about">
    <h2 class="cinema-about_item">About</h2>
    <p class="cinema-about_description">${data.overview}</p>
  </div>
  <button type="button" class="btn-modal-cinema js-modal-watched">ADD TO WATCHED</button>
  <button type="button" class="btn-modal-cinema js-modal-queue">ADD TO QUEUE</button>`;
}

// перевірка в базу даних і зміна значення кнопок

function getUserId(movieId) {
  let userId = null;
  auth.onAuthStateChanged(async user => {
    if (user) {
      userId = user.uid;
      await checkFilmInDB(movieId, userId);
    }
  });
}
