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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;