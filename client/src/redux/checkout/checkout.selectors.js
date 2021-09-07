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

export const selectShippingAddress = createSelector(
    [selectCheckout],
    checkout => {
        const { shippingAddress1, shippingCityMun, shippingProvince, shippingZipCode,
            shippingEmailAddress, shippingRegion } = checkout;

        return {
            shippingAddress1, shippingCityMun, shippingProvince, shippingZipCode,
            shippingEmailAddress, shippingRegion
        }
    }
);