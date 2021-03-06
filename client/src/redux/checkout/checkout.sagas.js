import { all, takeLatest, call, put, delay, select } from 'redux-saga/effects';
import axios from 'axios';

import checkoutActionTypes from "./checkout.types";
import {
    fetchShippingFeeSuccess, fetchShippingFeeFailed,
    fetchStripePaymentIntentSuccess, fetchStripePaymentIntenteFailed,
    confirmStripeCardPaymentSuccess, confirmStripeCardPaymentFailed
} from './checkout.actions';

import { selectCartTotalPrice } from '../cart/cart.selectors';
import { selectPaymentClientSecret, selectBillingDetails, selectShippingDetails } from './checkout.selectors';


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
    try {
        const clientSecret = yield select(selectPaymentClientSecret);
        const billing = yield select(selectBillingDetails);
        const shipping = yield select(selectShippingDetails);
        const payload = yield stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: `${billing.firstName} ${billing.lastName}`,
                    phone: billing.mobileNo,
                    email: billing.emailAddress,
                    address: {
                        city: billing.cityMun,
                        country: 'PH',
                        line1: billing.address1,
                        postal_code: billing.zipCode,
                        state: billing.province
                    }
                }
            },
            shipping: {
                name: `${shipping.firstName} ${shipping.lastName}`,
                phone: shipping.mobileNo,
                carrier: `LBC`,
                address: {
                    city: shipping.cityMun,
                    country: 'PH',
                    line1: shipping.address1,
                    postal_code: shipping.zipCode,
                    state: shipping.province
                }
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
    } catch (error) {
        yield put(confirmStripeCardPaymentFailed(error.message, null));
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