import userActionTypes from './user.types';

export const googleSignInStart = () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const signInSuccess = user => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = message => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: message
});

export const checkUserSession = () => ({
    type: userActionTypes.CHECK_USER_ACTION
});

export const signOutStart = () => ({
    type: userActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: userActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = message => ({
    type: userActionTypes.SIGN_OUT_FAILURE,
    payload: message
});

export const signUpStart = userCredential => ({
    type: userActionTypes.SIGN_UP_START,
    payload: userCredential
});

export const signUpSuccess = ({ user, additionalData }) => ({
    type: userActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
});

export const signUpFailure = message => ({
    type: userActionTypes.SIGN_UP_FAILURE,
    payload: message
});