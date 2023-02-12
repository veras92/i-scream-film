import { FimlsApi } from './film-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showLoader, hideLoader } from './loader';
import { checkFilmInDB } from './firebase';
import { getSrc } from './cardsInfoCoverter';
import { auth } from './firebase-config';

const backdrop = document.querySelector('.js-backdrop');
const listLibrary = document.querySelector('.js-gallery');
const cinemaCardWraper = document.querySelector('.modal-window');
const bodyEl = document.querySelector('body');

backdrop.addEventListener('click', onBackdropClick);
listLibrary.addEventListener('click', onCardClick);

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  backdrop.classList.add('is-hidden');
  bodyEl.classList.remove('stop-scrol');
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

async function onCardClick(e) {
  e.preventDefault();
  const { target } = e;
  const card = target.closest('.card');

  if (!card) return;
  window.addEventListener('keydown', onEscKeyPress);
  backdrop.classList.remove('is-hidden');
  bodyEl.classList.add('stop-scrol');
  const id = card.dataset.id;
  try {
    showLoader();
    const data = await filmsApi.getFilmById(id);

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

  const closeModalBtn = document.querySelector('.btn-modal');

  closeModalBtn.addEventListener('click', onCloseModal);
}

function renderModalWindow(data) {
  data.popularity = Math.round(data.popularity);
  data.vote_average = data.vote_average.toFixed(1);

  cinemaCardWraper.innerHTML = `
  <button type="button" class="btn-modal" data-modal-close>
      <svg class="modal-close-icon" width="14" height="14" 
      <symbol id="icon-close" viewBox="0 0 32 32">
      <path d="M32 3.223l-3.223-3.223-12.777 12.777-12.777-12.777-3.223 3.223 12.777 12.777-12.777 12.777 3.223 3.223 12.777-12.777 12.777 12.777 3.223-3.223-12.777-12.777 12.777-12.777z"></path>
      </symbol>
      >
      </svg>
    </button>
 <div class="cinema-img">
  <img class="cinema-img_item" src="${getSrc(data.poster_path)}" alt="${
    data.title
  }"/>
 </div>
 <div class="cinema-info" data-id=${data.id}>
  <h1 class="cinema-info_item">${data.title}</h1>
  <div class="cinema-info__list">
  <table class="cinema-table">
  <tr class="cinema-info_table">
    <td class="cinema-attribute">Vote / Votes</td>
    <td class="cinema-attribute_item"><span class="vote">${data.vote_average}</span> / <span class="vote-count">${data.vote_count}</span></span></td>
  </tr>
  <tr class="cinema-info_table">
    <td class="cinema-attribute">Popularity</td>
    <td class="cinema-attribute_item">${data.popularity}</td>
  </tr>
  <tr class="cinema-info_table">
    <td class="cinema-attribute">Original Title</td>
    <td class="cinema-attribute_item">${data.title}</td>
  </tr>
  <tr class="cinema-info_table">
    <td class="cinema-attribute">Genre</td>
    <td class="cinema-attribute_item">${data.genres.map(genre => `${genre.name}`).join(', ')}</td>
  </tr>
</table>
  </div>
  <div class="cinema-about">
    <h2 class="cinema-about_item">ABOUT</h2>
    <p class="cinema-about_description">${data.overview}</p>
  </div>
  <div class="button-modal-cinema">
  <button type="button" class="btn-modal-cinema_item js-modal-watched">ADD TO WATCHED</button>
  <button type="button" class="btn-modal-cinema_item js-modal-queue">ADD TO QUEUE</button>
  </div>`;
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
