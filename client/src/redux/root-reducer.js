import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import checkoutReducer from './checkout/checkout.reducer';

const rootReducer = (history) => combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer,
    checkout : checkoutReducer,
    router: connectRouter(history)
});

export default  rootReducer;