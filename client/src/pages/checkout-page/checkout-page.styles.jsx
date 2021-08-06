import styled from 'styled-components';

import { CheckoutFormContainer } from '../../components/checkout-form/checkout-form.styles';

export const CheckoutPageContainer = styled.div`
    min-height: 70vh;
    width: 60%;
    margin: 5rem auto 0;

    display: flex;
    justify-content: space-evenly;

    & ${CheckoutFormContainer} {
        flex: 2 0 60%;
    }
`;

export const CheckoutPageEmpty = styled.h2`
    font-size: 3rem;
    font-weight: normal;
    margin: auto;
    width: fit-content;
`;

export const StripeButtonContainer = styled.div`
    text-align: right;
    margin-top: 2rem;
`;