import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';

import { clearCart } from '../../redux/cart/cart.actions';

const stripeKey = 'pk_test_51GrdPxGXQEpKYmCgqpBcsxmOHkFPCIIGBaxpXOB5cqDtcwDm3C5GcZFQoIWiA3NgHpyFBTHBPDW0kTCFMQAeCE6a003uQm1GaR';

const StripeButton = ({ total }) => {
    const dispatch = useDispatch();

    const onToken = token => {
        console.log({ token });
        alert('Successful payment');
        dispatch(clearCart());
    }

    return (
        <StripeCheckout
            name='CRWN Clothing Ltd.'
            description={`Your total price is ${total}`}
            image='https://sendeyo.com/up/d/f3eb2117da'
            amount={total * 100}
            currency='PHP'
            stripeKey={stripeKey}
            shippingAddress
            billingAddress
            token={onToken}
        />
    )
};

export default StripeButton;