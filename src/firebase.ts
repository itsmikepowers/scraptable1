// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd4rVeP0wizMWKlLSM7BgUtfhracBqqjA",
  authDomain: "scrapetable.firebaseapp.com",
  projectId: "scrapetable",
  storageBucket: "scrapetable.appspot.com",
  messagingSenderId: "241926938140",
  appId: "1:241926938140:web:0b203f808ca1e4af02c9d9",
  measurementId: "G-RJ92PJJH30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};
