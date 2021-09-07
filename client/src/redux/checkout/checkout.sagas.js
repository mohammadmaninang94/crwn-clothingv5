import { all, takeLatest, call, put, delay  } from 'redux-saga/effects';

import checkoutActionTypes from "./checkout.types";
import { fetchShippingFeeSuccess, fetchShippingFeeFailed } from './checkout.actions';


export function* fetchShippingFee() {
    try {
        yield delay(10000)      
        yield put(fetchShippingFeeSuccess(5));
    } catch (error) {
        yield put(fetchShippingFeeFailed(error.message));
    }
}

export function* onFetchShippingFeeStart() {
    yield takeLatest(checkoutActionTypes.CALCULATE_SHIPPING_FEE_START, fetchShippingFee);
}


export default function* checkoutSagas() {
    yield all([call(onFetchShippingFeeStart)])
}