//firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAPJjrd3z6Gmg7eS3hs8IaffZJYThgARGI",
  authDomain: "jobsradar-f4b23.firebaseapp.com",
  databaseURL: "https://jobsradar-f4b23.firebaseio.com",
  projectId: "jobsradar-f4b23",
  storageBucket: "jobsradar-f4b23.appspot.com",
  messagingSenderId: "273563287501",
  appId: "1:273563287501:web:bc717fe7f10cc247878e84",
  measurementId: "G-0CMBVM60S7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const firestore = getFirestore(app);


export { app, auth, database, storage, firestore };
export default firebaseConfig;