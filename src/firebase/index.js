import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAmWvQWD2taK2VdkKbY627CuLNoS0_CHgU",
    authDomain: "cake-market-859d1.firebaseapp.com",
    projectId: "cake-market-859d1",
    storageBucket: "cake-market-859d1.appspot.com",
    messagingSenderId: "310917676059",
    appId: "1:310917676059:web:40fa112dbaabfe55444cbe",
    measurementId: "G-9CF1WFXCYM"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const storage = getStorage(app);

export {storage, db as default}