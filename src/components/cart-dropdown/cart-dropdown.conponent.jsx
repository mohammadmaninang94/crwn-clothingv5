import { connect } from 'react-redux';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-dropdown__items'>
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
        <CustomButton className='btn cart-dropdown__btn'>go to checkout</CustomButton>
    </div>
);

const mapStateToProps = ({ cart: { items } }) => ({
    cartItems: items
});

export default connect(mapStateToProps)(CartDropdown);