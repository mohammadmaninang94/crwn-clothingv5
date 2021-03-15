import { all, call, put, takeLatest } from 'redux-saga/effects';

import userActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

export function* clearCartOnSignOutSuccess() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOutSuccess)
}

export default function* cartSagas() {
    yield all([
        call(onSignOutSuccess)
    ]);
}