import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectUserSignInMessage = createSelector(
    [selectUser],
    user => user.signInMessage
);

export const selectUserSignUpMessage = createSelector(
    [selectUser],
    user => user.signUpMessage
);