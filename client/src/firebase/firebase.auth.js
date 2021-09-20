import {
    signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, GoogleAuthProvider, onAuthStateChanged, getAuth
} from "firebase/auth";
import firebaseApp from "./firebase.app";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
googleProvider.setCustomParameters({
    'prompt': 'select_account'
});

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, authUser => {
            unsubscribe();
            resolve(authUser);
        }, reject);
    });
};

export const getUserAuthFromGoogleSignInPopup = async () => {
    return await signInWithPopup(auth, googleProvider);
};

export const getUserAuthFromEmailPasswordSignUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const getUserAuthFromEmailPasswordSignIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async () => {
    return await signOut(auth);
};