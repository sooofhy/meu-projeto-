// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFgVEwnw3FY-5doD4QD0Us28gB5DWsKl8",
  authDomain: "teste-2d4c2.firebaseapp.com",
  projectId: "teste-2d4c2",
  storageBucket: "teste-2d4c2.appspot.com",
  messagingSenderId: "249395903295",
  appId: "1:249395903295:web:4aedbfc59a0edcc2d7718a",
  measurementId: "G-SQT4X6QFPF"
};

// Initialize Firebase
console.log('Conectado ao Firebase')
const Firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(Firebase);


export{firestore}