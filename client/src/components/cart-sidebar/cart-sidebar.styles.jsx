import styled, { css } from 'styled-components';

const getAnimationStyles = ({ hidden }) => {
    if (hidden) {
        return css`
            visibility: hidden;
            transform: translateX(100%);
        `;
    }
    return css`
        visibility: visible;
        transform: translateX(0);
    `;
}

export const CartSidebarContainer = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 40rem;

    background-color: var(--color-white);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    font-size: 1.6rem;
    letter-spacing: .1em;
    text-transform: uppercase;

    ${getAnimationStyles}
    transition: transform .5s cubic-bezier(.645, .045, .355, 1),visibility .5s cubic-bezier(.645, .045, .355, 1),-webkit-transform .5s cubic-bezier(.645, .045, .355, 1);
`;

export const CartClose = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--color-black-light);
    outline: transparent;
    transform: scale(1.1);
    transition: all 0.1s ease-in;
    padding: 7px 14px 8px 14px;
    font-size: 2.8rem;

    &:hover,
    &:active {
        color: var(--color-black);
        outline: transparent;
    }

    &:active {
        transform: scale(1);
    }
`;

export const CartSidebarTitle = styled.h2`
    font-size: 2rem;
    padding-left: .5rem;
    color: var(--color-black-light);
`;

export const SidebarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid #ddd;
`;