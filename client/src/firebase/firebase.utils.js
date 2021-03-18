import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBhQeOZUwmPfxmpP12XJLFn7HP9JmSMKXM",
    authDomain: "crwn-db-5bc6e.firebaseapp.com",
    databaseURL: "https://crwn-db-5bc6e.firebaseio.com",
    projectId: "crwn-db-5bc6e",
    storageBucket: "crwn-db-5bc6e.appspot.com",
    messagingSenderId: "139514886905",
    appId: "1:139514886905:web:9726ba290610869bf20028",
    measurementId: "G-LBJEEW4Q4L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`); // queryReferece - documentReference
    const userSnapshot = await userRef.get(); // document snapshot

    if (!userSnapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.mesasge)
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
        const { title, items } = docSnapshot.data();
        return {
            id: docSnapshot.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    'prompt': 'select_account'
});

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            unsubscribe();
            resolve(authUser);
        }, reject);
    });
}

export default firebase;