import styled from 'styled-components';

import { CustomInputContainer } from '../form-input/form-input.styles';
import CustomButton from './../custom-button/custom-button.component';

export const CheckoutFormContainer = styled.div`
    width: 100%;
    font-size: 1.6rem; 
`;

export const CheckoutFormWrapper = styled.div`
    padding: 0 2rem;
`;

export const CheckoutFormFieldset = styled.fieldset`
    border: none;
    margin-bottom: 2rem;
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
    }
`;

export const CheckoutFormSlug = styled.ul`
    display:flex;
    justify-content: center;
    font-size: inherit;
    list-style: none;
    margin-bottom: 5rem;

    @media only screen and (max-width: 37.5em) {
        justify-content: space-around;
        margin: 2rem 2rem 3rem 2rem;
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

    @media only screen and (max-width: 37.5em) {
        flex-direction: column-reverse;
        gap: 1rem
    }
`;

export const BackArrow = styled.span`
    padding-left: 5px;
    padding-right: 5px;
    transition: all 0.1s ease-in;
`;

export const CheckoutBackButton = styled(CustomButton)`
    min-width: 0;

    &:hover ${BackArrow}{
        padding-left: 0;
        padding-right: 10px;
    }
`;

