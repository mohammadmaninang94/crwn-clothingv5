import styled, { keyframes } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moveInRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(100rem);
    }
    80% {
        transform: translateX(1rem);
    }
    100% {
        opacity: 1;
        transform: translate(0);
    }
`;

export const CheckoutTableContainer = styled.div`
    width: 100%;
    padding: 2rem 5rem;
    animation-name: ${moveInRight};
    animation-duration: 1s;
    animation-timing-function: ease-out;
    transition: animation 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    font-size: 1.6rem;
    letter-spacing: .2rem;

    @media only screen and (max-width: 37.5em) {
        animation: none;
    }

    & .ReactCollapse--collapse {
        transition: height 500ms;
    }

    & .ReactCollapse--content {
        margin: 1rem 0;
    }
`;

export const CheckoutBreakdownContainer = styled.div`
    border-top: 1px solid var(--color-black-lighter);
    padding: 1rem 0;
`;

export const CheckoutBreakdown = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`;

export const CheckoutBreakdownText = styled.span`
    font-size: inherit;
`;

export const CheckoutBreakdownTotal = styled.b`
    font-size: inherit;
`;

export const CheckoutTotalPrice = styled.h2`
    font-size: 2rem;
`;

export const CheckoutSummaryContainer = styled.div`
    display: none;

    @media only screen and (max-width: 37.5em) {
        display: flex;
        justify-content: space-between;
        background-color: var(--color-grey-lighter);
        border-top: 1px solid var(--color-black-lighter);
        border-bottom: 1px solid var(--color-black-lighter);
        cursor: pointer;
        padding: 2rem;

        & span {
            padding-right: 1rem;
        }
    }
`;

export const CheckoutSummaryToggle = styled.div`
    font-size: 1.8rem;
    position: relative;
`;

export const FaIcon = styled(FontAwesomeIcon)`
    font-size: 1.6rem;
    opacity: 0;
    height: 0;
    transition: all .2s ease;

    display: block;
    position: absolute;
    top: 1px;
    right: -10px;

    &.show {
        opacity: 1;
        height: 100%;
    }
`;

export const CheckoutSummaryItemContainer = styled.div`
    @media only screen and (max-width: 37.5em) {
        visibility: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height .2s, visibility .5s, opacity .3s;
        padding: 2rem;
        padding-bottom: 0;
        background-color: var(--color-grey-light);
        overflow: hidden;

        &.show {
            max-height: 100%;
            opacity: 100;
            visibility: visible
        }
    }
`;