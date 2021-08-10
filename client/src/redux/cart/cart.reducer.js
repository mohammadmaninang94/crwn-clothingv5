import cartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart, clearItemFormCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    sidebar: true,
    items: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: action.payload ? action.payload : !state.hidden
            }
        case cartActionTypes.ADD_ITEM:
            return {
                ...state,
                items: addItemToCart(state.items, action.payload)
            }
        case cartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                items: removeItemFromCart(state.items, action.payload)
            }
        case cartActionTypes.CLEAR_ITEM:
            return {
                ...state,
                items: clearItemFormCart(state.items, action.payload)
            }
        case cartActionTypes.CLEAR_CART:
            return {
                ...state,
                items: []
            }
        case cartActionTypes.SET_CART_FROM_FIREBASE:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;