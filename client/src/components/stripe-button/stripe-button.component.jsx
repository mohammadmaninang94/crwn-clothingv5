import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { clearCart } from '../../redux/cart/cart.actions';

const stripeKey = 'pk_test_51GrdPxGXQEpKYmCgqpBcsxmOHkFPCIIGBaxpXOB5cqDtcwDm3C5GcZFQoIWiA3NgHpyFBTHBPDW0kTCFMQAeCE6a003uQm1GaR';

const StripeButton = ({ total }) => {
    const dispatch = useDispatch();

    const priceForStripe = total * 100;
    const currencyForStripe = 'PHP';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                currency: currencyForStripe,
                token
            }
        }).then(response => {
            alert('Successful payment');
            dispatch(clearCart());
        }).catch(error => {
            console.log({ error });
            alert('Please use the provided test credit card.')
        });
    }

    return (
        <StripeCheckout
            name='CRWN Clothing Ltd.'
            description={`Your total price is ${total}`}
            amount={priceForStripe}
            currency={currencyForStripe}
            stripeKey={stripeKey}
            shippingAddress
            billingAddress
            token={onToken}
        />
    )
};

export default StripeButton;