import { createSelector } from 'reselect';

const selectCheckout = state => state.checkout;

export const selectCheckoutStep = createSelector(
    [selectCheckout],
    checkout => checkout.step
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
    [selectCheckout],
    checkout => checkout.paymentType
);