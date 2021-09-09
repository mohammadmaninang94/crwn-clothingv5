import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import checkoutActionTypes from "./checkout.types";
import {
    fetchShippingFeeSuccess, fetchShippingFeeFailed,
    fetchStripePaymentIntentSuccess, fetchStripePaymentIntenteFailed
} from './checkout.actions';


export function* fetchShippingFee() {
    try {
        yield delay(10000);
        yield put(fetchShippingFeeSuccess(5));
    } catch (error) {
        yield put(fetchShippingFeeFailed(error.message));
    }
}

export function* fetchStripePaymentIntent({ payload: { amount, currency } }) {
    try {
        const res = yield axios({
            url: 'create-stripe-payment-intent',
            method: 'post',
            data: {
                amount,
                currency
            }
        });
        const clientSecret = yield res.json();
        console.log(clientSecret);
        // yield put(fetchStripePaymentIntentSuccess(clientSecret));
    } catch (error) {
        yield put(fetchStripePaymentIntenteFailed(error.message));
    }
}

export function* onFetchShippingFeeStart() {
    yield takeLatest(checkoutActionTypes.CALCULATE_SHIPPING_FEE_START, fetchShippingFee);
}

export function* onFetchingStripePaymentIntentStart() {
    yield takeLatest(checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_START, fetchShippingFee);
}

export default function* checkoutSagas() {
    yield all([
        call(onFetchShippingFeeStart),
        call(onFetchingStripePaymentIntentStart)
    ])
}