import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd4rVeP0wizMWKlLSM7BgUtfhracBqqjA",
  authDomain: "scrapetable.firebaseapp.com",
  projectId: "scrapetable",
  storageBucket: "scrapetable.appspot.com",
  messagingSenderId: "241926938140",
  appId: "1:241926938140:web:0b203f808ca1e4af02c9d9",
  measurementId: "G-RJ92PJJH30"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
