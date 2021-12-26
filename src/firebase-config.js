import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVsn1kvY7nNeTWPnCMW6PqVU9GYT1_nd8",
  authDomain: "todo-list-with-design.firebaseapp.com",
  databaseURL:
    "https://todo-list-with-design-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-list-with-design",
  storageBucket: "todo-list-with-design.appspot.com",
  messagingSenderId: "18057028939",
  appId: "1:18057028939:web:a244faca576b6cdd4df4ce",
  measurementId: "G-NT28E4KR9E",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
