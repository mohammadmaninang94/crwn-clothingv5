import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
    font-size: 1.6rem;
    margin-bottom: 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
`;

export const CheckoutItemfigure = styled.figure`
    display: flex;
    align-items: center;
    gap: 1.5rem; 
    position: relative;
`;

export const CheckoutItemImg = styled.img`
    width: 7rem;
    height: 7rem;
    object-fit: cover;
    margin-right: 0.2rem;
    border-radius: 5%;
`;

export const CheckoutItemFigcaption = styled.figcaption`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const CheckoutItemQty = styled.span`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-white);
    background-color: var(--color-black-light);
    text-align: center;
    position: absolute;
    top: -8px;
    left: 58px;

    &::before {
        content: "";
        padding-left: 2px;
    }

    @media only screen and (max-width: 37.5em) {
        top: -7px;
        left: 55px;
    }
`;

export const CheckoutItemPriceTotal = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    flex: 0 2 auto;
`;