import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { FimlsApi } from './film-service';
import { createHomepageCards } from './cards-library';
import { refs } from './refs';
import { showLoader, hideLoader } from './loader';

const firebaseConfig = {
  apiKey: 'AIzaSyA8HI-hGo7_WkrdYi4nAbp8aOc6TTRuWvY',
  authDomain: 'filmoteka-c3101.firebaseapp.com',
  projectId: 'filmoteka-c3101',
  storageBucket: 'filmoteka-c3101.appspot.com',
  messagingSenderId: '990735444623',
  appId: '1:990735444623:web:5585f899cc012270841efa',

  databaseURL: 'https://filmoteka-c3101-default-rtdb.firebaseio.com',
};

const app = firebase.initializeApp(firebaseConfig);

const btnWatchedEl = document.querySelector('.js-watched-button');
const btnQueueEl = document.querySelector('.js-queue-button');

btnWatchedEl.addEventListener('click', onClickWatchedBtn);
btnQueueEl.addEventListener('click', onClickQueueBtn);
// window.addEventListener('')

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
          '<li><h2 class="library-title-main">You have nothing on your watch list</h2></li>';
      }
    }
    if (action === 'queue') {
      if (!movies) {
        refs.list.innerHTML =
          '<li><h2 class="library-title-main">There is nothing in the queue</h2></li>';
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
