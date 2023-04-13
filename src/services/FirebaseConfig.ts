import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAg58zRzMdEtRlYLMLSUhaPZUghqKEfk5A",
    authDomain: "swift-note-d6cb2.firebaseapp.com",
    projectId: "swift-note-d6cb2",
    storageBucket: "swift-note-d6cb2.appspot.com",
    messagingSenderId: "772454487306",
    appId: "1:772454487306:web:0967ddaa5cce45a81716f3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default auth;