import { useState, Fragment } from 'react';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { convertToPHPCurrency } from '../../components/component.utils.js';

import {
    CheckoutTableContainer, CheckoutBreakdownContainer,
    CheckoutBreakdown, CheckoutBreakdownText, CheckoutBreakdownTotal,
    CheckoutTotalPrice, CheckoutSummaryContainer, CheckoutSummaryToggle,
    FaIcon, CheckoutSummaryItemContainer
} from './checkout-table.styles';

const CheckoutTable = ({ cartItems, cartTotalPrice, shippingFee, shippingFeeMessage }) => {
    const [summaryHidden, setSummaryHidden] = useState(true);

    const handleSummaryClick = event => {
        setSummaryHidden(!summaryHidden);
    };

    return (
        <CheckoutTableContainer>
            <CheckoutSummaryContainer onClick={handleSummaryClick}>
                <CheckoutSummaryToggle>
                    <Fragment>
                        <span>Order summary</span>
                        <FaIcon icon={summaryHidden ? faChevronDown : faChevronUp} />
                    </Fragment>
                </CheckoutSummaryToggle>
                <CheckoutTotalPrice>{convertToPHPCurrency(cartTotalPrice)}</CheckoutTotalPrice>
            </CheckoutSummaryContainer>
            <CheckoutSummaryItemContainer className={summaryHidden ? '' : 'show'}>
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
                        <CheckoutBreakdownText>{shippingFee ? convertToPHPCurrency(shippingFee) : shippingFeeMessage}</CheckoutBreakdownText>
                    </CheckoutBreakdown>
                </CheckoutBreakdownContainer>
                <CheckoutBreakdownContainer>
                    <CheckoutBreakdown>
                        <CheckoutBreakdownText>Total</CheckoutBreakdownText>
                        <CheckoutTotalPrice>{convertToPHPCurrency(cartTotalPrice)}</CheckoutTotalPrice>
                    </CheckoutBreakdown>
                </CheckoutBreakdownContainer>
            </CheckoutSummaryItemContainer>
        </CheckoutTableContainer>
    )
};

export default CheckoutTable;