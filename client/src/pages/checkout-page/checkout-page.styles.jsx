import styled from 'styled-components';

import { CheckoutFormContainer } from '../../components/checkout-form/checkout-form.styles';
import { CheckoutTableContainer } from '../../components/checkout-table/checkout-table.styles';

export const CheckoutPageContainer = styled.div`
    min-height: 70vh;
    width: 60vw;
    margin: 2rem auto 0;

    display: flex;
    justify-content: flex-start;

    & ${CheckoutFormContainer} {
        flex: 2 0 60%;
    }

    @media only screen and (max-width: 85.37em) {
        width: 90vw;
        & ${CheckoutTableContainer}{
            padding: 1rem;
        }
    }

    @media only screen and (max-width: 75em) {
        width: 90vw;
        & ${CheckoutTableContainer}{
            padding: 1rem;
        }
    }

    @media only screen and (max-width: 56.25em),
    only screen and (max-width: 37.5em) {
        flex-direction: column;
        width: 100vw;
        margin: 0;        

        & ${CheckoutFormContainer} {
            flex: 0 0 auto;
            padding: 0;
        }

        & ${CheckoutTableContainer}{
            order: -1;
            padding: 0;
        }
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