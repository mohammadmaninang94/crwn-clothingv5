import { memo } from 'react';
import { connect } from 'react-redux';

import { addItem, removeItem, clearItem } from '../../redux/cart/cart.actions';

import { convertToPHPCurrency } from '../../components/component.utils.js';

import {
    CheckoutItemContainer, CheckoutItemfigure, CheckoutItemImg,
    CheckoutItemFigcaption, CheckoutItemQty, CheckoutItemPriceTotal
} from './checkout-item.styles';

const CheckoutItem = ({ item, addItemToCart, removeItemFromCart, clearItemFromCart }) => {
    const { name, imageUrl, price, quantity } = item;
    return (
        <CheckoutItemContainer>
            <CheckoutItemfigure>
                <CheckoutItemImg src={imageUrl} alt={name} />
                <CheckoutItemFigcaption>{name}</CheckoutItemFigcaption>
                <CheckoutItemQty>{quantity}</CheckoutItemQty>
            </CheckoutItemfigure>
            <CheckoutItemPriceTotal>{convertToPHPCurrency(price * quantity)}</CheckoutItemPriceTotal>
        </CheckoutItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(addItem(item)),
    removeItemFromCart: item => dispatch(removeItem(item)),
    clearItemFromCart: item => dispatch(clearItem(item))
});

export default memo(connect(null, mapDispatchToProps)(CheckoutItem));