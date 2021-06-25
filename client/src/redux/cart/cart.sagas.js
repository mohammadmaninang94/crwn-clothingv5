import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import { getUserCartRef } from '../../firebase/firebase.utils';

import { selectCartItems } from './cart.selectors';
import { selectCurrentUser } from '../user/user.selectors';
import userActionTypes from '../user/user.types';
import cartActionTypes from './cart.types';
import { clearCart, setCartFromFirebase } from './cart.actions';

export function* updateCartInFirebase() {
    const currentUser = yield select(selectCurrentUser);
    if (currentUser) {
        try {
            const userCartRef = yield getUserCartRef(currentUser.id);
            if (userCartRef) {
                const items = yield select(selectCartItems);
                yield userCartRef.update({ items });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export function* clearCartOnSignOutSuccess() {
    yield put(clearCart());
}

export function* getUserCartItemsFromFirebase({ payload: user }) {
    const userCartRef = yield getUserCartRef(user.id);
    if (userCartRef) {
        const cartSnapshot = yield userCartRef.get();
        if (cartSnapshot.exists) {
            const cartData = cartSnapshot.data();
            if (cartData) {
                yield put(setCartFromFirebase(cartData.items));
            }
        }
    }
}

export function* onSignOutSuccess() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOutSuccess)
}

export function* onUserSignInSuccess() {
    yield takeLatest(userActionTypes.SIGN_IN_SUCCESS, getUserCartItemsFromFirebase)
}

export function* onCartChange() {
    yield takeLatest([
        cartActionTypes.ADD_ITEM,
        cartActionTypes.REMOVE_ITEM,
        cartActionTypes.CLEAR_ITEM,
        cartActionTypes.CLEAR_CART
    ], updateCartInFirebase);
}

export default function* cartSagas() {
    yield all([
        call(onSignOutSuccess),
        call(onUserSignInSuccess),
        call(onCartChange),
    ]);
}