import {
    getFirestore, collection, query, where, getDocs,
    getDoc, updateDoc, doc, setDoc, addDoc
} from "firebase/firestore";
import firebaseApp from "./firebase.app";
import { convertCollectionsSnapshotToMap } from "./firebase.utils";

const firestorePaths = {
    carts: 'carts',
    users: 'users',
    collections: 'collections',
    checkouts: 'checkouts'
};

const firestore = getFirestore(firebaseApp);

export const getUserCartRef = async userId => {
    if (!userId) return null;

    const cartsRef = collection(firestore, firestorePaths.carts);
    const userCartsRef = query(cartsRef, where('userId', '==', userId));// queryReferece - documentReference
    const cartSnapshot = await getDocs(userCartsRef); // document snapshot

    if (cartSnapshot.empty) {
        try {
            const cartRef = doc(cartsRef);
            await setDoc(cartRef, { userId, items: [] });
            return cartRef;
        } catch (error) {
            console.log('error creating cart', error);
            return null;
        }
    }

    return cartSnapshot.docs[0].ref;
};

export const getUserCartData = async userId => {
    const userCartRef = await getUserCartRef(userId);

    if (userCartRef) {
        const userCartSnapshot = await getDoc(userCartRef);
        if (userCartSnapshot.exists()) {
            return userCartSnapshot.data();
        }
    }

    return null;
};

export const updateUserCartData = async (userId, items) => {
    const userCartRef = await getUserCartRef(userId);

    if (userCartRef) {
        await updateDoc(userCartRef, {
            items
        });
    }
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore, `${firestorePaths.users}/${userAuth.uid}`); // queryReferece - documentReference
    let userSnapshot = await getDoc(userRef); // document snapshot

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
            userSnapshot = await getDoc(userRef); // document snapshot
        } catch (error) {
            console.log('error creating user', error)
        }
    }

    return userSnapshot;
};

export const getCollectionData = async () => {
    const collectionsRef = collection(firestore, firestorePaths.collections);
    const collectionsSnapshot = await getDocs(collectionsRef);

    return collectionsSnapshot;
};

export const getCollectionDataToMap = async () => {
    const collectionsSnapshot = await getCollectionData();
    return convertCollectionsSnapshotToMap(collectionsSnapshot);
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

export const createCheckoutDocument = async (userId, cartItems) => {
    const newCheckoutRef = await addDoc(collection(firestore, firestorePaths.checkouts), {
        cartItems,
        userId
    });
    return newCheckoutRef.id;
};

export const updateCheckoutDocument = async (id, shippingDetails, billingDetails, paymentDetails, shippingFee) => {
    const checkoutRef = doc(firestore, `${firestorePaths.checkouts}/${id}`);
    const checkoutSnapshot = await getDoc(checkoutRef);

    if (checkoutSnapshot.exists()) {
        await updateDoc(checkoutRef, {
            shippingDetails,
            billingDetails,
            shippingFee,
            paymentDetails
        });
    }
};