import firebase from 'firebase/compat/app';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
// import { app } from './authentication';
import { getAuth } from 'firebase/auth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { showLoader, hideLoader } from './loader';
// console.log(showLoader);
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

const modalWindowEl = document.querySelector('.modal-window');
// console.log(modalWindowEl);
export const auth = getAuth();
export const database = getDatabase(app);
// натискання по кнопці модального вікна
modalWindowEl.addEventListener('click', async e => {
  const clickOnWatched = e.target.classList.contains('js-modal-watched');
  const clickOnQueue = e.target.classList.contains('js-modal-queue');
  const cinemaInfoEl = document.querySelector('.cinema-info');

  const movieId = cinemaInfoEl.getAttribute('data-id');

  const btnWatchedEl = document.querySelector('.js-modal-watched');
  const btnQoeoeEl = document.querySelector('.js-modal-queue');

  const btnWatchedTextContent = btnWatchedEl.textContent.toUpperCase();
  const btnQoeoeTextContent = btnQoeoeEl.textContent.toUpperCase();
  if (clickOnWatched) {
    // якщо натиснули на js-modal-watched
    getUserId('watched', movieId);
    // console.log(btnWatchedTextContent);
    if (btnWatchedTextContent == 'add to watched'.toUpperCase()) {
      btnWatchedEl.textContent = 'remove from watched'.toUpperCase();
      // console.log('wastch');
    } else {
      btnWatchedEl.textContent = 'add to watched'.toUpperCase();
    }
  }
  if (clickOnQueue) {
    // якщо натиснули на js-modal-queue
    getUserId('queue', movieId);

    if (btnQoeoeTextContent == 'add to queue'.toUpperCase()) {
      btnQoeoeEl.textContent = 'remove from queue'.toUpperCase();
    } else {
      btnQoeoeEl.textContent = 'add to queue'.toUpperCase();
    }
  }
});

// // отримуємо id користувача

function getUserId(action, movieId) {
  let userId = null;
  auth.onAuthStateChanged(async user => {
    if (user) {
      userId = user.uid;

      await toggleWatchedMovie(movieId, userId, action);
    }
  });
}

async function toggleWatchedMovie(id, userId, action) {
  try {
    const movieRef = ref(database, `${userId}/${action}/${id}`);
    const movieSnapshot = await get(movieRef);
    const movie = movieSnapshot.val();

    if (movie) {
      await remove(movieRef);
      Notify.failure('movie removed');
    } else {
      await set(movieRef, id);

      Notify.success('movie added');
    }
  } catch (error) {
    console.error(error);
  }
}

///chek

export async function checkFilmInDB(id, userId) {
  try {
    const movieRefWatched = ref(database, `${userId}/watched/${id}`);
    const movieRefQueue = ref(database, `${userId}/queue/${id}`);
    const movieSnapshotWatched = await get(movieRefWatched);
    const movieSnapshotQueue = await get(movieRefQueue);
    const movieWatched = movieSnapshotWatched.val();
    const movieQueue = movieSnapshotQueue.val();

    const btnWatchedEl = document.querySelector('.js-modal-watched');
    const btnQoeoeEl = document.querySelector('.js-modal-queue');

    if (movieWatched) {
      btnWatchedEl.textContent = 'added'.toUpperCase();
    } else {
      // немає фільму
    }
    if (movieQueue) {
      console.log('queue є фільм');
      btnQoeoeEl.textContent = 'in queue'.toUpperCase();
    } else {
      // немає фільму
    }
  } catch (error) {
    console.error(error);
  }
}
