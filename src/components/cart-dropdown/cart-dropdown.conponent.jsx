import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className={`cart-dropdown__items ${cartItems.length > 2 ? 'cart-dropdown__items--scroll' : ''}`}>
            {cartItems.length ?
                cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                )) :
                <span className='cart-dropdown__empty-mesage'>You cart is empty</span>
            }
        </div>
        <CustomButton className='btn cart-dropdown__btn' onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }}>go to checkout</CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));