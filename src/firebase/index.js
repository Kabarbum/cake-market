import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "cake-market-859d1.firebaseapp.com",
    projectId: "cake-market-859d1",
    storageBucket: "cake-market-859d1.appspot.com",
    messagingSenderId: "310917676059",
    appId: "1:310917676059:web:40fa112dbaabfe55444cbe",
    measurementId: "G-9CF1WFXCYM"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage}