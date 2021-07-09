import styled, { css } from 'styled-components';

const checkoutItemBtnStyles = css`
    font-size: inherit;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--color-black-light);
    outline: transparent;
    transform: scale(1.1);
    transition: all 0.1s ease-in;

    &:hover,
    &:active {
    color: var(--color-black);
    outline: transparent;
    }

    &:active {
    transform: scale(1);
    }
`;

export const CheckoutItemContainer = styled.tr`
    & td:first-of-type {
        width: 45%;
    }

    & td:last-of-type {
        width: 5%;
    }

    & td:not(:first-of-type) {
        text-align: center;
    }
`;

export const CheckoutItemProduct = styled.figure`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

export const CheckoutItemImg = styled.img`
    height: 100%;
    width: 30%;
    margin: 2rem 0;
`;

export const CheckoutItemQty = styled.span`
    margin: 0 0.5rem;
`;

export const CheckoutItemArrow = styled.button`
    ${checkoutItemBtnStyles}
`;

export const CheckoutItemRemove= styled.button`
    ${checkoutItemBtnStyles}
`;