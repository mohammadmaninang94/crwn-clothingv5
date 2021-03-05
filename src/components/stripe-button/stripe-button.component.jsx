import StripeCheckout from 'react-stripe-checkout';

const stripeKey = 'pk_test_51GrdPxGXQEpKYmCgqpBcsxmOHkFPCIIGBaxpXOB5cqDtcwDm3C5GcZFQoIWiA3NgHpyFBTHBPDW0kTCFMQAeCE6a003uQm1GaR';

const onToken = token => {
    console.log({ token });
    alert('Successful payment');
}

const StripeButton = ({ total }) => (
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
);

export default StripeButton;