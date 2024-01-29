import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
const firebaseConfig = {
  apiKey: 'AIzaSyD5Wg0rqw3nTV2PK1CBc0rF5m1wl45tyTU',
  authDomain: 'gnti-at-adypsoe.firebaseapp.com',
  databaseURL:
    'https://gnti-at-adypsoe-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'gnti-at-adypsoe',
  storageBucket: 'gnti-at-adypsoe.appspot.com',
  messagingSenderId: '108176675437',
  appId: '1:108176675437:web:fcbaec3fae96b8f6cd6564',
};
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions();
database.useEmulator('127.0.0.1', 9000);
functions.useEmulator('127.0.0.1', 5001);
