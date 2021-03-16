import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    signInMessage: null,
    signUpMessage: null,
    signOutMessage: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                signInMessage: null,
                signUpMessage: null,
                signOutMessage: null,
            }
        case userActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                signInMessage: null,
                signUpMessage: null,
                signOutMessage: null,
            }
        case userActionTypes.SIGN_IN_FAILURE:
            return {
                ...state, 
                signInMessage: action.payload,
                signUpMessage: null,
                signOutMessage: null,
            }
        case userActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                signInMessage: null,
                signUpMessage: null,
                signOutMessage: action.payload,
            }
        case userActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                signInMessage: null,
                signUpMessage: action.payload,
                signOutMessage: null,
            }
        default:
            return state;
    }
}

export default userReducer;