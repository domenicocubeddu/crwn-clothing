import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
