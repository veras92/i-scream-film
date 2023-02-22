import { ref, set, get, remove } from 'firebase/database';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { app, auth, database } from './firebase-config';

const modalWindowEl = document.querySelector('.modal-window');

// натискання по кнопці модального вікна
modalWindowEl.addEventListener('click', e => {
  const clickOnWatched = e.target.classList.contains('js-modal-watched');
  const clickOnQueue = e.target.classList.contains('js-modal-queue');
  const cinemaInfoEl = document.querySelector('.cinema-info');

  const movieId = cinemaInfoEl.getAttribute('data-id');

  if (clickOnWatched) {
    // якщо натиснули на js-modal-watched
    getUserId('watched', movieId);
  }
  if (clickOnQueue) {
    // якщо натиснули на js-modal-queue
    getUserId('queue', movieId);
  }
});

// // отримуємо id користувача

function getUserId(action, movieId) {
  try {
    let userId = null;
    auth.onAuthStateChanged(async user => {
      if (user) {
        userId = user.uid;

        await toggleWatchedMovie(movieId, userId, action);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function toggleWatchedMovie(id, userId, action) {
  try {
    const movieRef = ref(database, `${userId}/${action}/${id}`);
    const movieSnapshot = await get(movieRef);

    // console.log(movieSnapshot);

    const movie = movieSnapshot.val();
    // console.log(movie);

    if (movie) {
      await remove(movieRef);
      Notify.failure('movie removed');
      changeTextContentBtn(action);
    } else {
      await set(movieRef, id);
      changeTextContentBtn(action);

      Notify.success('movie added');
    }
  } catch (error) {
    console.error(error);
  }
}

///chek

function changeTextContentBtn(action) {
  if (action === 'watched') {
    const btnWatchedEl = document.querySelector('.js-modal-watched');
    const btnWatchedTextContent = btnWatchedEl.textContent.toUpperCase();
    if (btnWatchedTextContent === 'add to watched'.toUpperCase()) {
      btnWatchedEl.textContent = 'remove from watched'.toUpperCase();
    } else {
      btnWatchedEl.textContent = 'add to watched'.toUpperCase();
    }
  }

  if (action === 'queue') {
    const btnQueueEl = document.querySelector('.js-modal-queue');
    const btnQueueTextContent = btnQueueEl.textContent.toUpperCase();
    if (btnQueueTextContent === 'add to queue'.toUpperCase()) {
      btnQueueEl.textContent = 'remove from queue'.toUpperCase();
    } else {
      btnQueueEl.textContent = 'add to queue'.toUpperCase();
    }
  }
}

/// ============як буде час, буду думати як нормально переписати цей код
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
      btnWatchedEl.textContent = 'remove from watched'.toUpperCase();
    }
    if (movieQueue) {
      btnQoeoeEl.textContent = 'remove from queue'.toUpperCase();
    }
  } catch (error) {
    console.error(error);
  }
}
