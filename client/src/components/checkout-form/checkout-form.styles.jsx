import styled from 'styled-components';

import { CustomInputContainer } from '../form-input/form-input.styles';
import CustomButton from './../custom-button/custom-button.component';

export const CheckoutFormContainer = styled.div`
    width: 100%;
    font-size: 1.6rem; 
    letter-spacing: .2rem;

    & .StripeElement--webkit-autofill {
        background: transparent !important;
    }

    & .StripeElement {
        margin-top: 2rem;
        width: 100%;
        padding: 1.2rem 1rem;
        background-color: var(--color-white);
        border: 1px solid var(--color-black-lighter);
        border-radius: 5px;
    }
`;

export const CheckoutFormWrapper = styled.div`
    padding: 0 2rem;

    & form {
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        &.hide {
            display: none;
        }
    }
`;

export const CheckoutFormFieldset = styled.fieldset`
    border: none;
    display: none;

    &.show {
        display: flex;
        flex-direction: column;

        @media only screen and (max-width: 37.5em) {
            flex: 1 0 auto;
        }
    }
`;

export const CheckoutFormLegend = styled.legend`
    font-size: 2rem;
`;

export const CustomInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    & ${CustomInputContainer} {
        width: 100%;
        margin: 2rem 0 0 0;
    }

    @media only screen and (max-width: 37.5em) {
        flex-direction: column;
        gap: 0;
    }
`;

export const CheckoutFormSlug = styled.ul`
    display:flex;
    justify-content: center;
    font-size: inherit;
    list-style: none;
    margin-bottom: 5rem;

    @media only screen and (max-width: 56.25em),
    only screen and (max-width: 37.5em) {
        margin: 1rem 1.5rem 3rem 1.5rem;
    }
`;

export const CheckoutFormSlugItem = styled.li`
    color: ${props => props.isActive ?
        'var(--color-black-light)' : 'var(--color-black-lighter)'};

    &:not(:last-child):after {
        content: ">";
        font-weight: bold;
        padding: 1rem;
    }
`;

export const CheckoutFormButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;   

    @media only screen and (max-width: 37.5em) {
        flex-direction: column-reverse;
        gap: 1rem;
        margin-bottom: 2rem;  
    }
`;

export const BackArrow = styled.span`
    padding-left: 5px;
    padding-right: 5px;
    transition: all 0.1s ease-in;
`;

export const CheckoutBackButton = styled(CustomButton)`
    min-width: 0;
    padding: 0;

    &:hover ${BackArrow}{
        padding-left: 0;
        padding-right: 10px;
    }
`;

export const FormInputContainer = styled.div`
    display: block;
    &.hide {
        display: none;
    }
`;

export const PaymentTypeContainer = styled.div`
    margin-bottom: 3rem;
`;