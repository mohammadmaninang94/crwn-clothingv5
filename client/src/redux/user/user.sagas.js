import { takeLatest, put, call, all } from 'redux-saga/effects';

import { createUserProfileDocument } from '../../firebase/firebase.firestore';
import {
    getUserAuthFromEmailPasswordSignIn, getCurrentUser,
    getUserAuthFromEmailPasswordSignUp, getUserAuthFromGoogleSignInPopup, userSignOut
} from '../../firebase/firebase.auth';

import userActionTypes from './user.types';
import {
    signInSuccess, signInFailure, signOutSuccess,
    signOutFailure, signUpFailure, signUpSuccess
} from './user.actions';


export function* setSnapshotfromUserAuth(userAuth, additionalData) {
    try {
        const userSnapshot = yield call(createUserProfileDocument, userAuth, additionalData);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithGoogle() {
    try {
        const userAuth = yield getUserAuthFromGoogleSignInPopup();
        if (userAuth) {
            yield call(setSnapshotfromUserAuth, userAuth.user);
        }
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const userAuth = yield getUserAuthFromEmailPasswordSignIn(email, password);
        if (userAuth) {
            yield call(setSnapshotfromUserAuth, userAuth.user);
        }
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* isUserAuthenticated() {
    const userAuth = yield getCurrentUser();
    if (userAuth) {
        yield call(setSnapshotfromUserAuth, userAuth);
    } else {
        return;
    }
};

export function* signOut() {
    try {
        yield userSignOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error.message));
    }
}

export function* signUp({ payload: { email, password, ...otherData } }) {
    try {
        const { user } = yield getUserAuthFromEmailPasswordSignUp(email, password);
        yield put(signUpSuccess({ user, additionalData: { ...otherData } }));
    } catch (error) {
        const errorCode = error.code;
        let errorMessage = error.message;

        switch (errorCode) {
            case 'auth/email-already-in-use':
                errorMessage = 'Email already exists';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email';
                break;
            case 'auth/weak-password':
                errorMessage = 'The password is too weak.';
                break;
            default:
                errorMessage = error.message;
                break;
        }

        yield put(signUpFailure(errorMessage))
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield call(setSnapshotfromUserAuth, user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(userActionTypes.CHECK_USER_ACTION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export default function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}