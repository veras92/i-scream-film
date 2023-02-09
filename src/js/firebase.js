import { getDatabase, ref, set, onValue, get, child } from 'firebase/database';
import { app } from './authentication';
import { getAuth } from 'firebase/auth';

// const database = getDatabase(app);

// const btnModalWatched = document.querySelector('.btn-modal-cinema');

// // отримуємо id користувача

// function getUserId() {
//   const auth = getAuth();
//   console.log(auth);
//   let userId = null;
//   auth.onAuthStateChanged(user => {
//     if (user) {
//       userId = user.uid;
//       //   writeUserData(userId);
//       //   listenerDataBase(userId);
//       //   getData(userId);
//       console.log(userId);
//     }
//   });
// }

// getUserId();

// function writeUserData(userId) {
//   //   const db = getDatabase();
//   set(ref(database, 'users/' + userId), {
//     watched: ['batman', 'avatar'],
//   });
// }

// прослуховувач
// function listenerDataBase(userId) {
//   const starCountRef = ref(database, 'users/' + userId);
//   onValue(starCountRef, snapshot => {
//     const data = snapshot.val();
//     console.log(data.watched);
//     // updateStarCount(postElement, data);
//   });
// }

// отримати данні один раз
// function getData(userId) {
//   const dbRef = ref(database);
//   get(child(dbRef, `users/${userId}`))
//     .then(snapshot => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log('No data available');
//       }
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }
