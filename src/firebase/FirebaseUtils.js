import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDsyQGGb957a7h7wtb9JmtOOmLPO7_cecw",
    authDomain: "crwn-db-e9a84.firebaseapp.com",
    databaseURL: "https://crwn-db-e9a84.firebaseio.com",
    projectId: "crwn-db-e9a84",
    storageBucket: "crwn-db-e9a84.appspot.com",
    messagingSenderId: "88978654621",
    appId: "1:88978654621:web:e1adce6e8fae169954db74",
    measurementId: "G-W62W0J5HCT"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;