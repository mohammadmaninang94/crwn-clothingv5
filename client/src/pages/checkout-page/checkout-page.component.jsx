import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotalPrice, selectCartSubTotalPrice } from '../../redux/cart/cart.selectors';
import { selectShippingFee, selectIsShippingFeeFetching, selectShippingFeeMessage, selectPaymentProcessing } from '../../redux/checkout/checkout.selectors';

import CheckoutForm from '../../components/checkout-form/checkout-form.component';
import CheckoutTable from '../../components/checkout-table/checkout-table.component';
import Spinner from '../../components/spinner/spinner.component';

import { CheckoutPageContainer } from './checkout-page.styles';

const CheckoutPage = ({ cartItems, cartTotalPrice, shippingFee, isFetchingShippingFee, isPaymentProcessing, shippingFeeMessage, cartSubTotalPrice }) => (
    <CheckoutPageContainer>
        <CheckoutForm />
        <CheckoutTable cartItems={cartItems}
            cartTotalPrice={cartTotalPrice}
            cartSubTotalPrice={cartSubTotalPrice}
            shippingFee={shippingFee}
            shippingFeeMessage={shippingFeeMessage} />
        {isFetchingShippingFee || isPaymentProcessing ?
            <Spinner /> : null}
    </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotalPrice: selectCartTotalPrice,
    cartSubTotalPrice: selectCartSubTotalPrice,
    shippingFee: selectShippingFee,
    isFetchingShippingFee: selectIsShippingFeeFetching,
    shippingFeeMessage: selectShippingFeeMessage,
    isPaymentProcessing: selectPaymentProcessing
});

export default connect(mapStateToProps)(CheckoutPage);