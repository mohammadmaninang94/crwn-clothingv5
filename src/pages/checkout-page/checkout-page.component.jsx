import { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotalPrice } from '../../redux/cart/cart.selectors';

import CheckoutTable from '../../components/checkout-table/checkout-table.component';
import StripeButton from '../../components/stripe-button/stripe-button.component';

import { CheckoutPageContainer, CheckoutPageEmpty, StripeButtonContainer } from './checkout-page.styles';

const CheckoutPage = ({ cartItems, cartTotalPrice }) => (
    <CheckoutPageContainer>
        {cartTotalPrice ? (
            <Fragment>
                <CheckoutTable cartItems={cartItems} cartTotalPrice={cartTotalPrice} />
                <StripeButtonContainer>
                    <StripeButton total={cartTotalPrice} />
                </StripeButtonContainer>
            </Fragment>
        ) : <CheckoutPageEmpty>You cart is empty</CheckoutPageEmpty>}
    </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotalPrice: selectCartTotalPrice
})

export default connect(mapStateToProps)(CheckoutPage);