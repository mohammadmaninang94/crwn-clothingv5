import { useEffect } from 'react';
import { useDispatch } from 'react-redux'; 

import { fetchStripePaymentIntentStart, updatePaymentDisabled } from '../../redux/checkout/checkout.actions';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeButton = ({ total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    useEffect(() => {
        const priceForStripe = total * 100;
        const currencyForStripe = 'PHP';

        const stripeData = {
            amount: priceForStripe,
            currency: currencyForStripe
        };

        dispatch(fetchStripePaymentIntentStart(stripeData));
    }, [dispatch, total]);

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        updatePaymentDisabled(event.empty);
        // setError(event.error ? event.error.message : "");
      };

    const cardOptions = {
        style: {
            base: {
                color: "black",
                fontWeight: 300,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                letterSpacing: "2px",
                ":-webkit-autofill": {
                    color: "#fce883"
                },
                "::placeholder": {
                    color: "rgb(98, 102, 102)"
                }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        },
        hidePostalCode: true
    };

    return (
        <CardElement
            options={cardOptions}
            onChange={handleChange} 
        />
    )
};

export default StripeButton;