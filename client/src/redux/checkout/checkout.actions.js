import checkoutActionTypes from "./checkout.types";

export const updateShippingDetails = shippingDetails => ({
    type: checkoutActionTypes.UPDATE_SHIPPING_DETAILS,
    payload: shippingDetails
});

export const updateBillingDetails = billingDetails => ({
    type: checkoutActionTypes.UPDATE_BILLING_DETAILS,
    payload: billingDetails
});

export const fetchShippingFeeStart = () => ({
    type: checkoutActionTypes.CALCULATE_SHIPPING_FEE_START
});

export const fetchShippingFeeSuccess = amount => ({
    type: checkoutActionTypes.CALCULATE_SHIPPING_FEE_SUCCESS,
    payload: amount
});

export const fetchShippingFeeFailed = message => ({
    type: checkoutActionTypes.CALCULATE_SHIPPING_FEE_FAILED,
    payload: message
});

export const updateCheckoutStep = step => ({
    type: checkoutActionTypes.UPDATE_STEP,
    payload: step
});

export const updateCheckoutID = checkoutID => ({
    type: checkoutActionTypes.UPDATE_ID,
    payload: checkoutID
});

export const fetchStripePaymentIntentStart = () => ({
    type: checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_START,
});

export const fetchStripePaymentIntentSuccess = clientSecret => ({
    type: checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
    payload: clientSecret
});

export const fetchStripePaymentIntenteFailed = message => ({
    type: checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_FAILED,
    payload: message
});

export const confirmStripeCardPaymentStart = (stripe, elements, CardElement) => ({
    type: checkoutActionTypes.CONFIRM_STRIPE_CARD_PAYMENT_START,
    payload: { stripe, elements, CardElement }
});

export const confirmStripeCardPaymentSuccess = (stripePayload) => ({
    type: checkoutActionTypes.CONFIRM_STRIPE_CARD_PAYMENT_SUCCESS,
    payload: stripePayload
});

export const confirmStripeCardPaymentFailed = (error, stripePayload) => ({
    type: checkoutActionTypes.CONFIRM_STRIPE_CARD_PAYMENT_FAILED,
    payload: { error, stripePayload }
});

export const updatePaymentDisabled = disabled => ({
    type: checkoutActionTypes.UPDATE_PAYMENT_DISABLED,
    payload: disabled
});

export const updatePaymentError = message => ({
    type: checkoutActionTypes.UPDATE_PAYMENT_ERROR,
    payload: message
});