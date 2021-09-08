import checkoutActionTypes from "./checkout.types";

export const updateShippingDetails = (shippingDetails) => ({
    type: checkoutActionTypes.UPDATE_SHIPPING_DETAILS,
    payload: shippingDetails
});

export const updateBillingDetails = (billingDetails) => ({
    type: checkoutActionTypes.UPDATE_BILLINGING_DETAILS,
    payload: billingDetails
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

export const updateCheckoutStep = (step) => ({
    type: checkoutActionTypes.UPDATE_STEP,
    payload: step
});