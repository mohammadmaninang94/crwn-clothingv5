import { memo, Profiler } from 'react';

import { convertToPHPCurrency } from '../component.utils';

import { CartItemContainer, CartItemImg, CartItemDetails } from './cart-item.styles';

const CartItem = ({ item: { name, imageUrl, price, quantity } }) => (
    <Profiler id='Directory' onRender={(id, phase, actualDuration) => {
        console.log({ id, phase, actualDuration });
    }}>
        <CartItemContainer>
            <CartItemImg src={imageUrl} alt='item' />
            <CartItemDetails>
                <span>{name}</span>
                <span>{quantity} &times; {convertToPHPCurrency(price)}</span>
            </CartItemDetails>
        </CartItemContainer>
    </Profiler>
);

export default memo(CartItem);