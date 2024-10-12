// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
require('dotenv').config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: 'expensify-3ec0a.firebaseapp.com',
  projectId: 'expensify-3ec0a',
  storageBucket: 'expensify-3ec0a.appspot.com',
  messagingSenderId: '598068866759',
  appId: '1:598068866759:web:fb117e4205e2b90e1798e2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;
