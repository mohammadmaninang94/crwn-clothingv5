import { memo, Profiler } from 'react';
import { connect } from 'react-redux';

import { addItem, removeItem, clearItem } from '../../redux/cart/cart.actions';

import { convertToPHPCurrency } from '../component.utils';

import {
    CartItemContainer, CartItemCell, CartItemfigure, CartItemImg, CartItemFigcaption,
    CartItemRemove, CheckoutItemSelector, CartItemQty, CartSelectorContainer, CartItemPrice
} from './cart-item.styles';

const CartItem = ({ item, removeItemFromCart, addItemToCart, clearItemFromCart, sidebar }) => {
    const { name, imageUrl, price, quantity } = item;
    const minQtyPerItem = 1;
    const maxQtyPerItem = 10;
    return (
        <Profiler id='Directory' onRender={(id, phase, actualDuration) => {
            console.log({ id, phase, actualDuration });
        }}>
            <CartItemContainer>
                <CartItemCell textAlign='left' sidebar={sidebar}>
                    <CartItemfigure sidebar={sidebar}>
                        <CartItemImg src={imageUrl} alt={name} sidebar={sidebar}/>
                        <CartItemFigcaption sidebar={sidebar}>{name}</CartItemFigcaption>
                        <CartItemPrice sidebar={sidebar}>{convertToPHPCurrency(price * quantity)}</CartItemPrice>
                        <CartSelectorContainer sidebar={sidebar} mobile={true}>
                            <CheckoutItemSelector onClick={() => quantity > minQtyPerItem ? removeItemFromCart(item) : null}>&minus;</CheckoutItemSelector>
                            <CartItemQty>{quantity}</CartItemQty>
                            <CheckoutItemSelector onClick={() => quantity < maxQtyPerItem ? addItemToCart(item) : null}>+</CheckoutItemSelector>
                        </CartSelectorContainer>
                        <CartItemRemove sidebar={sidebar} mobile={true} onClick={() => clearItemFromCart(item)}>Remove</CartItemRemove>
                    </CartItemfigure>
                </CartItemCell>
                <CartItemCell sidebar={sidebar}>{convertToPHPCurrency(price)}</CartItemCell>
                <CartItemCell sidebar={sidebar}>
                    <CartSelectorContainer>
                        <CheckoutItemSelector onClick={() => quantity > minQtyPerItem ? removeItemFromCart(item) : null}>&minus;</CheckoutItemSelector>
                        <CartItemQty>{quantity}</CartItemQty>
                        <CheckoutItemSelector onClick={() => quantity < maxQtyPerItem ? addItemToCart(item) : null}>+</CheckoutItemSelector>
                    </CartSelectorContainer>
                    <CartItemRemove onClick={() => clearItemFromCart(item)}>Remove</CartItemRemove>
                </CartItemCell>
                <CartItemCell sidebar={sidebar} textAlign='right'>{convertToPHPCurrency(price * quantity)}</CartItemCell>
            </CartItemContainer>
        </Profiler>
    )
};

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(addItem(item)),
    removeItemFromCart: item => dispatch(removeItem(item)),
    clearItemFromCart: item => dispatch(clearItem(item))
});

export default memo(connect(null, mapDispatchToProps)(CartItem));