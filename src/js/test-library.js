import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import { FimlsApi } from './film-service';
import { createHomepageCards } from './cards-library';
import { refs } from './refs';
import { showLoader, hideLoader } from './loader';
import { app } from './firebase-config';

window.addEventListener('load', () => {
  refs.list.innerHTML =
    '<li class="library-title-item"><h2 class="library-title-main">Welcome to your library</h2></li>';
});

const btnWatchedEl = document.querySelector('.js-watched-button');
const btnQueueEl = document.querySelector('.js-queue-button');

btnWatchedEl.addEventListener('click', onClickWatchedBtn);
btnQueueEl.addEventListener('click', onClickQueueBtn);

function onClickWatchedBtn() {
  getUserId('watched');
}
function onClickQueueBtn() {
  getUserId('queue');
}
async function getDataArray(userId, action) {
  try {
    showLoader();
    const database = getDatabase(app);
    const moviesRef = ref(database, `${userId}/${action}`);
    const moviesSnapshot = await get(moviesRef);
    const movies = moviesSnapshot.val();

    if (action === 'watched') {
      if (!movies) {
        refs.list.innerHTML =
          '<li class="library-title-item"><h2 class="library-title-main">You have nothing on your watch list</h2></li>';
      }
    }
    if (action === 'queue') {
      if (!movies) {
        refs.list.innerHTML =
          '<li class="library-title-item"><h2 class="library-title-main">There is nothing in the queue</h2></li>';
      }
    }

    if (movies) {
      const moviesArray = Object.values(movies);
      //тут масив з id
      getFilms(moviesArray);

      return moviesArray;
    } else {
      // якщо фільмі немає, очищає сторінку
      // refs.list.innerHTML = '';
      return [];
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function getFilms(filmsIdsArr) {
  const filmsApi = new FimlsApi();
  const filmsArr = await Promise.all(
    filmsIdsArr.map(id => filmsApi.getFilmById(id))
  );

  // filmsArr масив з інфою про фільми
  const markup = createHomepageCards(filmsArr);
  renderMarkup(markup);
}

function renderMarkup(markup) {
  refs.list.innerHTML = markup;
}

function getUserId(action) {
  const auth = getAuth();

  auth.onAuthStateChanged(user => {
    if (user) {
      const userId = user.uid;
      getDataArray(userId, action);
    }
  });
}
