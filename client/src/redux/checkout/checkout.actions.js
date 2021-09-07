import checkoutActionTypes from "./checkout.types";

export const updateCheckout = (key, value) => ({
    type: checkoutActionTypes.UPDATE_PROP,
    payload: { key, value }
});

export const fetchShippingFeeStart = () => ({
    type: checkoutActionTypes.CALCULATE_SHIPPING_FEE_START
});

export const fetchShippingFeeSuccess = (amount) => ({
    type: checkoutActionTypes.CALCULATE_SHIPPING_FEE_SUCCESS,
    payload: amount
});

export const fetchShippingFeeFailed = (message) => ({
    type: checkoutActionTypes.CALCULATE_SHIPPING_FEE_SUCCESS,
    payload: message
});

export const updateStep = (step) => ({
    type: checkoutActionTypes.UPDATE_STEP,
    payload: step
});