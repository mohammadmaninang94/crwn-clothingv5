import styled from 'styled-components';

import { CustomInputContainer } from '../form-input/form-input.styles';

export const CheckoutFormContainer = styled.div`
    width: 100%;
    font-size: 1.6rem; 
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
`;

export const CheckoutFormSlug = styled.ul`
    display:flex;
    justify-content: center;
    font-size: inherit;
    list-style: none;
    margin-bottom: 5rem;
`;

export const CheckoutFormSlugItem = styled.li`
    &:not(:last-child):after {
        content: ">";
        font-weight: bold;
        padding: 1rem;
        color: ${props => props.isActive ? 
            'var(--color-black-light)' : 'var(--color-black-lighter)' };
    }
`;