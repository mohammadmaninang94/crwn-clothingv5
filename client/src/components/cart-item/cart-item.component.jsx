import { memo } from 'react';

import { convertToPHPCurrency } from '../component.utils';

import { CartItemContainer, CartItemImg, CartItemDetails } from './cart-item.styles';

const CartItem = ({ item: { name, imageUrl, price, quantity } }) => (
    <CartItemContainer>
        <CartItemImg src={imageUrl} alt='item' />
        <CartItemDetails>
            <span>{name}</span>
            <span>{quantity} &times; {convertToPHPCurrency(price)}</span>
        </CartItemDetails>
    </CartItemContainer>
);

export default memo(CartItem);