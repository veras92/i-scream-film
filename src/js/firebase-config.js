import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA8HI-hGo7_WkrdYi4nAbp8aOc6TTRuWvY',
  authDomain: 'filmoteka-c3101.firebaseapp.com',
  projectId: 'filmoteka-c3101',
  storageBucket: 'filmoteka-c3101.appspot.com',
  messagingSenderId: '990735444623',
  appId: '1:990735444623:web:5585f899cc012270841efa',

  databaseURL: 'https://filmoteka-c3101-default-rtdb.firebaseio.com',
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase(app);
