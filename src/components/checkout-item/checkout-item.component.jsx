import { connect } from 'react-redux';

import { addItem, removeItem, clearItem } from '../../redux/cart/cart.actions';

import { convertToPHPCurrency } from '../../components/component.utils.js';

import {
    CheckoutItemContainer, CheckoutItemProduct, CheckoutItemImg,
    CheckoutItemQty, CheckoutItemArrow, CheckoutItemRemove
} from './checkout-item.styles';

const CheckoutItem = ({ item, addItemToCart, removeItemFromCart, clearItemFromCart }) => {
    const { name, imageUrl, price, quantity } = item;
    const minQtyPerItem = 1;
    const maxQtyPerItem = 10;
    return (
        <CheckoutItemContainer>
            <td>
                <CheckoutItemProduct>
                    <CheckoutItemImg src={imageUrl} alt={name} />
                    <figcaption>{name}</figcaption>
                </CheckoutItemProduct>
            </td>
            <td>
                <CheckoutItemArrow onClick={() => quantity > minQtyPerItem ? removeItemFromCart(item) : null}>&#10094;</CheckoutItemArrow>
                <CheckoutItemQty>{quantity}</CheckoutItemQty>
                <CheckoutItemArrow onClick={() => quantity < maxQtyPerItem ? addItemToCart(item) : null}>&#10095;</CheckoutItemArrow>
            </td>
            <td>{convertToPHPCurrency(price)}</td>
            <td><CheckoutItemRemove onClick={() => clearItemFromCart(item)}>&#10005;</CheckoutItemRemove></td>
        </CheckoutItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(addItem(item)),
    removeItemFromCart: item => dispatch(removeItem(item)),
    clearItemFromCart: item => dispatch(clearItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);