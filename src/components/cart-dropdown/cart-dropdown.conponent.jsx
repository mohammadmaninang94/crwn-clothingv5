import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => (
    <div className='cart-dropdown'>
        <ul className='cart-dropdown__items'></ul>
        <CustomButton className='btn cart-dropdown__btn'>go to checkout</CustomButton>
    </div>
);

export default CartDropdown;