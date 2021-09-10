import { all, takeLatest, call, put, delay, select } from 'redux-saga/effects';
import axios from 'axios';

import checkoutActionTypes from "./checkout.types";
import {
    fetchShippingFeeSuccess, fetchShippingFeeFailed,
    fetchStripePaymentIntentSuccess, fetchStripePaymentIntenteFailed,
    confirmStripeCardPaymentSuccess, confirmStripeCardPaymentFailed
} from './checkout.actions';

import { selectCartTotalPrice } from '../cart/cart.selectors';
import { selectPaymentClientSecret } from './checkout.selectors';


export function* fetchShippingFee() {
    try {
        yield delay(5000);
        yield put(fetchShippingFeeSuccess(5));
    } catch (error) {
        yield put(fetchShippingFeeFailed(error.message));
    }
}

export function* fetchStripePaymentIntent() {
    try {
        const cartTotal = yield select(selectCartTotalPrice);
        const stripeAmount = cartTotal * 100;
        const res = yield axios({
            url: '/create-stripe-payment-intent',
            method: 'post',
            data: {
                amount: stripeAmount,
                currency: 'php'
            }
        });
        if (res.data) {
            const clientSecret = res.data.clientSecret;
            yield put(fetchStripePaymentIntentSuccess(clientSecret));
        }
    } catch (error) {
        yield put(fetchStripePaymentIntenteFailed(error.message));
    }
}

export function* confirmStripeCardPayment({ payload: { stripe, elements, CardElement } }) {
    const clientSecret = yield select(selectPaymentClientSecret);
    const payload = yield stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    });
    if (payload.error) {
        yield put(confirmStripeCardPaymentFailed(
            `Payment failed ${payload.error.message}`,
            payload
        ));
    } else {
        yield put(confirmStripeCardPaymentSuccess(payload));
    }
}

export function* onFetchShippingFeeStart() {
    yield takeLatest(checkoutActionTypes.CALCULATE_SHIPPING_FEE_START, fetchShippingFee);
}

export function* onFetchingStripePaymentIntentStart() {
    yield takeLatest(checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_START, fetchStripePaymentIntent);
}

export function* onConfirmStripeCardPayment() {
    yield takeLatest(checkoutActionTypes.CONFIRM_STRIPE_CARD_PAYMENT_START, confirmStripeCardPayment);
}

export default function* checkoutSagas() {
    yield all([
        call(onFetchShippingFeeStart),
        call(onFetchingStripePaymentIntentStart),
        call(onConfirmStripeCardPayment)
    ])
}