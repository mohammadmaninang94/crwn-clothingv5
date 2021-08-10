import cartActionTypes from './cart.types';

export const toggleCartHidden = (toggle) => ({
    type: cartActionTypes.TOGGLE_CART_HIDDEN,
    payload: toggle
});

export const addItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
});

export const removeItem = item => ({
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
});

export const clearItem = item => ({
    type: cartActionTypes.CLEAR_ITEM,
    payload: item
});

export const clearCart = () => ({
    type: cartActionTypes.CLEAR_CART
});

export const setCartFromFirebase = items => ({
    type: cartActionTypes.SET_CART_FROM_FIREBASE,
    payload: items
});