import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const config = {
  apiKey: "AIzaSyDeb3YdnBxfEkpVlUQqa7ZpUAx9FylkJ8Y",
  authDomain: "crwn-db-52190.firebaseapp.com",
  projectId: "crwn-db-52190",
  storageBucket: "crwn-db-52190.appspot.com",
  messagingSenderId: "600481362860",
  appId: "1:600481362860:web:33fa40e87b437334d2c009",
  measurementId: "G-SRYQ8354X7",
};

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
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
