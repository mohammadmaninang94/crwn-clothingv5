import { connect } from 'react-redux';

import { addItem, removeItem, clearItem } from '../../redux/cart/cart.actions';

import { convertToPHPCurrency } from '../../components/component.utils.js';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item, addItemToCart, removeItemFromCart, clearItemFromCart }) => {
    const { name, imageUrl, price, quantity } = item;
    const minQtyPerItem = 1;
    const maxQtyPerItem = 10;
    return (
        <tr className='checkout-item'>
            <td>
                <figure className='checkout-item__product'>
                    <img src={imageUrl} alt={name} className='checkout-item__img' />
                    <figcaption>{name}</figcaption>
                </figure>
            </td>
            <td>
                <button className='checkout-item__arrow' onClick={() => quantity > minQtyPerItem ? removeItemFromCart(item) : null}>&#10094;</button>
                <span className='checkout-item__quantity'>{quantity}</span>
                <button className='checkout-item__arrow' onClick={() => quantity < maxQtyPerItem ? addItemToCart(item) : null}>&#10095;</button>
            </td>
            <td>{convertToPHPCurrency(price)}</td>
            <td><button className='checkout-item__remove' onClick={() => clearItemFromCart(item)}>&#10005;</button></td>
        </tr>
    )
};

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(addItem(item)),
    removeItemFromCart: item => dispatch(removeItem(item)),
    clearItemFromCart: item => dispatch(clearItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);