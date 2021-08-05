import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotalPrice } from '../../redux/cart/cart.selectors';

import CheckoutForm from '../../components/checkout-form/checkout-form.component';

// import CheckoutTable from '../../components/checkout-table/checkout-table.component';
// import StripeButton from '../../components/stripe-button/stripe-button.component';

import { CheckoutPageContainer, CheckoutPageEmpty, StripeButtonContainer } from './checkout-page.styles';

const CheckoutPage = ({ cartItems, cartTotalPrice }) => (
    <CheckoutPageContainer>
        <CheckoutForm />
    </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotalPrice: selectCartTotalPrice
})

export default connect(mapStateToProps)(CheckoutPage);