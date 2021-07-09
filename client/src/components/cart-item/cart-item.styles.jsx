import styled, { css } from 'styled-components';

const cartItemBtnStyles = css`
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--color-black-light);
    outline: transparent;
    transform: scale(1.1);
    transition: all 0.1s ease-in;
    padding: 7px 14px 8px 14px;

    &:hover,
    &:active {
        color: var(--color-black);
        outline: transparent;
    }

    &:active {
        transform: scale(1);
    }
`;

const getCartItemImgMobileStyling = css`
    grid-column: 1 / 2;
    grid-row: 1 / 4;
`;

const getCartItemImgStyling = ({ sidebar }) => {
    if (sidebar)
        return getCartItemImgMobileStyling;
    return '';
}

export const CartItemImg = styled.img`
    width: 10rem;
    object-fit: cover;
    margin-right: 0.2rem;

    ${getCartItemImgStyling}

    @media only screen and (max-width: 37.5em) {
        ${getCartItemImgMobileStyling}
    }
`;

const getCartItemFigcaptionMobileStyling = css`
    grid-column: 2 / 5;
    grid-row: 1 / 2;
`;

const getCartItemFigcaptionStyling = ({ sidebar }) => {
    if (sidebar)
        return getCartItemFigcaptionMobileStyling;
    return '';
}

export const CartItemFigcaption = styled.figcaption`
    font-size: 1.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${getCartItemFigcaptionStyling}
    @media only screen and (max-width: 37.5em) {
        ${getCartItemFigcaptionMobileStyling}
    }
`;

export const CartItemContainer = styled.div`
    display: table-row;
    margin: 30px 0;
`;

const getCartItemMobileStyling = css`
    display: block;
    &:not(:nth-of-type(1)) {
        display: none;
    }
`;

const getCartItemDefaultStyling = css`
    display: table-cell;
    vertical-align: middle;
`;

const getCartItemStyling = ({ sidebar }) => {
    if (sidebar) {
        return getCartItemMobileStyling;
    }
    return getCartItemDefaultStyling;
};

export const CartItemCell = styled.div`
    text-align: ${props => props.textAlign ? props.textAlign : 'center'};
    ${getCartItemStyling}

    @media only screen and (max-width: 37.5em) {
        ${getCartItemMobileStyling}
    }   
`;

const getCartItemfigureMobileStyling = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
`;

const getCartItemfigureSidebarStyling = ({ sidebar }) => {
    if (sidebar)
        return getCartItemfigureMobileStyling;
    return '';
}

export const CartItemfigure = styled.figure`
    display: flex;
    align-items: center;
    gap: 2rem;

    ${getCartItemfigureSidebarStyling}

    @media only screen and (max-width: 37.5em) {
        ${getCartItemfigureMobileStyling}
    }  
`;

const getCartSelectorContainerMobileStyling = css`
    display: inline-flex;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
`;

const getCartSelectorContainerStyling = ({ sidebar }) => {
    if (sidebar)
        return getCartSelectorContainerMobileStyling;
    return '';
}

export const CartSelectorContainer = styled.div`
    display: ${props => props.mobile ? 'none' : 'inline-flex'};
    justify-content: center;
    align-items: center;
    align-content: space-between;
    border: 1px solid #ddd;

    ${getCartSelectorContainerStyling}

    @media only screen and (max-width: 37.5em) {
        ${getCartSelectorContainerMobileStyling}
    }
`;

export const CartItemQty = styled.span`
    margin: 0 0.5rem;
    font-size: 1.4rem;
`;

export const CheckoutItemSelector = styled.button`
    ${cartItemBtnStyles}
`;


const getCartItemRemoveMobileStyling = css`
    display: block;
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    align-self: center;
    margin: 0;
    padding: 0;
`;

const getCartItemRemoveStyling = ({ sidebar }) => {
    if (sidebar)
        return getCartItemRemoveMobileStyling;
    return '';
}

export const CartItemRemove = styled.button`
    display: ${props => props.mobile ? 'none' : 'block'};
    margin: .5rem auto;
    font-size: 1rem;
    text-transform: inherit;
    letter-spacing: inherit;
    ${cartItemBtnStyles}
    color: var(--color-grey);

    ${getCartItemRemoveStyling}

    @media only screen and (max-width: 37.5em) {
        ${getCartItemRemoveMobileStyling}
    }
`;

const getCartItemPriceMobileStyling = css`
    display: block;
    grid-column: 4 / 5;
    grid-row: 2 / 3;
`;

const getCartItemPriceStyling = ({ sidebar }) => {
    if (sidebar)
        return getCartItemPriceMobileStyling;
    return '';
}

export const CartItemPrice = styled.span`
    display: none;

    ${getCartItemPriceStyling}

    @media only screen and (max-width: 37.5em) {
        ${getCartItemPriceMobileStyling}
    }
`;