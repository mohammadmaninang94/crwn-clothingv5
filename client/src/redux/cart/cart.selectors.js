import { createSelector } from 'reselect';
import { selectShippingFee } from '../checkout/checkout.selectors';

const selectCart = state => state.cart;

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.items
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQty, item) =>
        accumulatedQty + item.quantity, 0)
);

export const selectCartSubTotalPrice = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQty, item) =>
        accumulatedQty + (item.quantity * item.price), 0)
);

export const selectCartTotalPrice = createSelector(
    [selectCartItems, selectShippingFee],
    (cartItems, shippingFee) => cartItems.reduce((accumulatedQty, item) =>
        accumulatedQty + (item.quantity * item.price), 0) + shippingFee
);