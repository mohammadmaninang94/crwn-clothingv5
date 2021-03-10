import styled from 'styled-components';

export const CartItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    height: 8rem;
`;

export const CartItemImg = styled.img`
    width: 30%;
    height: 100%;
    object-fit: cover;
    margin-right: 0.2rem;
`;

export const CartItemDetails = styled.div`
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 2rem;
    width: 70%;
    height: 100%;
`;