import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNy3FJ_daAoYqQ2k752XKPhRTUIZBOMpY",
  authDomain: "all-your-notes-app.firebaseapp.com",
  databaseURL:
    "https://all-your-notes-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "all-your-notes-app",
  storageBucket: "all-your-notes-app.appspot.com",
  messagingSenderId: "877999727709",
  appId: "1:877999727709:web:95c1236191ce8e380d59b4",
  measurementId: "G-C3XBMJ09LW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
