import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assests/image/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemsCount }) => {
    console.log({ itemsCount });
    return (
        <div className='cart-icon' onClick={toggleCartHidden}>
            <ShoppingIcon className='cart-icon__shopping-icon' />
            <span className='cart-icon__count'>{itemsCount}</span>
        </div>
    )
};

const mapStateToProps = state => ({
    itemsCount: selectCartItemsCount(state)
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);