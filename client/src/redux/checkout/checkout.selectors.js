import { createSelector } from 'reselect';

const selectCheckout = state => state.checkout;

export const selectCheckoutId = createSelector(
    [selectCheckout],
    checkout => checkout.id
);

export const selectCheckoutStep = createSelector(
    [selectCheckout],
    checkout => checkout.step
);

export const selectPaymentDetails = createSelector(
    [selectCheckout],
    checkout => checkout.paymentDetails
);

export const selectShippingFee = createSelector(
    [selectCheckout],
    checkout => checkout.shippingFee
);

export const selectShippingFeeMessage = createSelector(
    [selectCheckout],
    checkout => checkout.shippingFeeMessage
);

export const selectIsShippingFeeFetching = createSelector(
    [selectCheckout],
    checkout => checkout.isFetchingShippingFee
);

export const selectShippingDetails = createSelector(
    [selectCheckout],
    checkout => checkout.shippingDetails
);

export const selectBillingDetails = createSelector(
    [selectCheckout],
    checkout => checkout.billingDetails
);

export const selectPaymentType = createSelector(
    [selectPaymentDetails],
    paymentDetails => paymentDetails.paymentType
);

export const selectPaymentDisabled = createSelector(
    [selectPaymentDetails],
    paymentDetails => paymentDetails.disabled
);

export const selectPaymentClientSecret = createSelector(
    [selectPaymentDetails],
    paymentDetails => paymentDetails.clientSecret
);

export const selectPaymentProcessing = createSelector(
    [selectPaymentDetails],
    paymentDetails => paymentDetails.processing
);

export const selectPaymentError = createSelector(
    [selectPaymentDetails],
    paymentDetails => paymentDetails.error
);

export const selectPaymentSucceeded = createSelector(
    [selectPaymentDetails],
    paymentDetails => paymentDetails.succeeded
);