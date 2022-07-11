Then, initialize Firebase and begin using the SDKs for the products you'd like to use.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVKofJsoclIPZ5aGK_Ny6h3RLiZ0FQcNo",
  authDomain: "nanpa-49ec3.firebaseapp.com",
  projectId: "nanpa-49ec3",
  storageBucket: "nanpa-49ec3.appspot.com",
  messagingSenderId: "797135326884",
  appId: "1:797135326884:web:607494ddc56a6117032031",
  measurementId: "G-X9SNDEBWHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);