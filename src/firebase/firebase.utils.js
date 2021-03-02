import firebase from 'firebase/app';
import 'firebase/firestore'; //for database
import 'firebase/auth'; //for authentication

const config = {
    apiKey: "AIzaSyAQ58zQl3PC5JBRo58wyfggVtYpfpQrQNk",
    authDomain: "crwn-clothing-96f8a.firebaseapp.com",
    projectId: "crwn-clothing-96f8a",
    storageBucket: "crwn-clothing-96f8a.appspot.com",
    messagingSenderId: "344540497554",
    appId: "1:344540497554:web:5e45fd75bcdb20b96b884b",
    measurementId: "G-KB19R47WVW"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestor = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;