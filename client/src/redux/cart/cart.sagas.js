import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import { getUserCartData, updateUserCartData } from '../../firebase/firebase.firestore';

import { selectCartItems } from './cart.selectors';
import { selectCurrentUser } from '../user/user.selectors';

import userActionTypes from '../user/user.types';
import cartActionTypes from './cart.types';
import checkoutActionTypes from '../checkout/checkout.types';

import { clearCart, setCartFromFirebase } from './cart.actions';


export function* updateCartInFirebase() {
    const currentUser = yield select(selectCurrentUser);
    if (currentUser) {
        try {
            const items = yield select(selectCartItems);
            yield updateUserCartData(currentUser.id, items);
        } catch (error) {
            console.log(error);
        }
    }
}

export function* clearCartOnSuccess() {
    yield put(clearCart());
}

export function* getUserCartItemsFromFirebase({ payload: user }) {
    const cartData = yield getUserCartData(user.id);
    if (cartData) {
        yield put(setCartFromFirebase(cartData.items));
    }
}

export function* onSignOutSuccess() {
    yield takeLatest([
        userActionTypes.SIGN_OUT_SUCCESS,
        checkoutActionTypes.CONFIRM_STRIPE_CARD_PAYMENT_SUCCESS
    ], clearCartOnSuccess)
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