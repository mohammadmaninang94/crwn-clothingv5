import checkoutActionTypes from "./checkout.types";

export const updateShippingDetails = shippingDetails => ({
    type: checkoutActionTypes.UPDATE_SHIPPING_DETAILS,
    payload: shippingDetails
});

export const updateBillingDetails = billingDetails => ({
    type: checkoutActionTypes.UPDATE_BILLINGING_DETAILS,
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

export const fetchStripePaymentIntentStart = stripeData => ({
    type: checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_START,
    payload: stripeData
});

export const fetchStripePaymentIntentSuccess = clientSecret => ({
    type: checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
    payload: clientSecret
});

export const fetchStripePaymentIntenteFailed = message => ({
    type: checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_FAILED,
    payload: message
});

export const updatePaymentDisabled = disabled => ({
    type: checkoutActionTypes.UPDATE_PAYMENT_DISABLED,
    payload: disabled
});