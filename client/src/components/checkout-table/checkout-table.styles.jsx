import styled from 'styled-components';

export const CheckoutTableContainer = styled.div`
    width: 100%;
    padding: 2rem 5rem;
`;

export const CheckoutBreakdownContainer = styled.div`
    border-top: 1px solid var(--color-black-lighter);
    padding: 1rem 0;
`;

export const CheckoutBreakdown = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const CheckoutBreakdownText = styled.span`
    font-size: 1.6rem;
`;

export const CheckoutBreakdownTotal = styled.b`
    font-size: 1.6rem;
`;

export const CheckoutTotalText = styled.span`
    font-size: 2rem;
`;

export const CheckoutTotalPrice = styled.h2`
    font-size: 2rem;
`;