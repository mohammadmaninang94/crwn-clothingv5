import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { convertToPHPCurrency } from '../../components/component.utils.js';

import {
    CheckoutTableContainer, CheckoutBreakdownContainer,
    CheckoutBreakdown, CheckoutBreakdownText, CheckoutBreakdownTotal,
    CheckoutTotalText, CheckoutTotalPrice
} from './checkout-table.styles';

const CheckoutTable = ({ cartItems, cartTotalPrice }) => (
    <CheckoutTableContainer>
        {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} item={cartItem} />
        ))}
        <CheckoutBreakdownContainer>
            <CheckoutBreakdown>
                <CheckoutBreakdownText>Subtotal</CheckoutBreakdownText>
                <CheckoutBreakdownTotal>{convertToPHPCurrency(cartTotalPrice)}</CheckoutBreakdownTotal>
            </CheckoutBreakdown>
            <CheckoutBreakdown>
                <CheckoutBreakdownText>Shipping Fee</CheckoutBreakdownText>
                <CheckoutBreakdownText>Calculated at next step</CheckoutBreakdownText>
            </CheckoutBreakdown>
        </CheckoutBreakdownContainer>
        <CheckoutBreakdownContainer>
            <CheckoutBreakdown>
                <CheckoutBreakdownText>Total</CheckoutBreakdownText>
                <CheckoutTotalPrice>{convertToPHPCurrency(cartTotalPrice)}</CheckoutTotalPrice>
            </CheckoutBreakdown>
        </CheckoutBreakdownContainer>
    </CheckoutTableContainer>
);

export default CheckoutTable;