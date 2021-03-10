import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CartItem from '../cart-item/cart-item.component';

import {
    CartDropdownContainer, CartDropdownItems,
    CartDropdownButton, CartDropdownEmptyMessage
} from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer>
        <CartDropdownItems itemsCount={cartItems.length}>
            {cartItems.length ?
                cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                )) :
                <CartDropdownEmptyMessage>You cart is empty</CartDropdownEmptyMessage>
            }
        </CartDropdownItems>
        {cartItems.length ? (
            <CartDropdownButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }}>go to checkout</CartDropdownButton>
        ) : null}

    </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));