import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router'
import axios from 'axios';

import checkoutActionTypes from "./checkout.types";
import {
    fetchShippingFeeSuccess, fetchShippingFeeFailed,
    fetchStripePaymentIntentSuccess, fetchStripePaymentIntenteFailed,
    confirmStripeCardPaymentSuccess, confirmStripeCardPaymentFailed,
    fetchCheckoutSuccess, fetchCheckoutFailed
} from './checkout.actions';
import { createCheckoutDocument, updateCheckoutDocument } from '../../firebase/firebase.firestore';

import { selectCurrentUser } from '../user/user.selectors';
import { selectCartTotalPrice, selectCartItems } from '../cart/cart.selectors';
import {
    selectPaymentClientSecret, selectBillingDetails,
    selectShippingDetails,
    selectCheckoutId,
    selectShippingFee
} from './checkout.selectors';



export function* fetchShippingFee() {
    try {
        const res = yield axios({
            url: '/get-shipping-fee',
            method: 'post'
        });

        if (res) {
            const shippingFee = res.data.shippingFee;
            yield put(fetchShippingFeeSuccess(shippingFee));
        }
    } catch (error) {
        yield put(fetchShippingFeeFailed('Please try again'));
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
        const checkoutId = yield select(selectCheckoutId);
        const billing = yield select(selectBillingDetails);
        const shipping = yield select(selectShippingDetails);
        const shippingFee = yield select(selectShippingFee);
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
            const paymentDetails = {
                paymentType: 'stripe',
                gatewayResponse: payload
            }
            yield updateCheckoutDocument(checkoutId, shipping, billing, paymentDetails, shippingFee);
            yield put(confirmStripeCardPaymentSuccess(payload));
            yield put(push('/'));
        }
    } catch (error) {
        yield put(confirmStripeCardPaymentFailed(error.message, null));
    }
}

export function* fetchCheckoutIdInFirebase() {
    try {
        const currentUser = yield select(selectCurrentUser);
        const cartItems = yield select(selectCartItems);
        const checkoutId = yield createCheckoutDocument(currentUser.id, cartItems);
        if (checkoutId) {
            yield put(fetchCheckoutSuccess(checkoutId));
        }
    } catch (error) {
        console.log(error);
        yield put(fetchCheckoutFailed('error in creating checkout'));
        return null;
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

export function* onFetchingCheckoutId() {
    yield takeLatest(checkoutActionTypes.CREATE_CHECKOUT_START, fetchCheckoutIdInFirebase);
}

export default function* checkoutSagas() {
    yield all([
        call(onFetchShippingFeeStart),
        call(onFetchingStripePaymentIntentStart),
        call(onConfirmStripeCardPayment),
        call(onFetchingCheckoutId)
    ])
}