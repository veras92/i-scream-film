// console.log('тестова перевірка на роботу імпортів');
// import { getDatabase, ref, set, onValue, get, child } from 'firebase/database';
// import { app } from './authentication';
// import { getAuth } from 'firebase/auth';
// import firebase from 'firebase/compat/app';

// // const database = getDatabase(app);
// const firebaseConfig = {
//   apiKey: 'AIzaSyA8HI-hGo7_WkrdYi4nAbp8aOc6TTRuWvY',
//   authDomain: 'filmoteka-c3101.firebaseapp.com',
//   projectId: 'filmoteka-c3101',
//   storageBucket: 'filmoteka-c3101.appspot.com',
//   messagingSenderId: '990735444623',
//   appId: '1:990735444623:web:5585f899cc012270841efa',

//   databaseURL: 'https://filmoteka-c3101-default-rtdb.firebaseio.com',
// };

// const app = firebase.initializeApp(firebaseConfig);
// // отримуємо id користувача
// function getUserId() {
//   const auth = getAuth();

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
