import styled, { css } from 'styled-components';

const defaultStyles = css`
    color: var(--color-white);
    background-color: var(--color-black-light);
    border: none;

    &:hover,
    &:active {
        background-color: var(--color-black);
        box-shadow: 0 0.5rem 1rem rgba(var(--color-black-rgb), 0.2);
    }
`;

const invertedStyles = css`
    color: var(--color-black);
    background-color: var(--color-white);
    border: 1px solid var(--color-black-light);

    &:hover,
    &:active {
        color: var(--color-white);
        background-color: var(--color-black);
        box-shadow: 0 0.5rem 1rem rgba(var(--color-black-rgb), 0.2);
    }
`;

const googleStyles = css`
    color: var(--color-white);  
    background-color: var(--color-google);
    border: none;

    &:hover,
    &:active {
        color: var(--color-white);
        background-color: var(--color-google-dark);
        box-shadow: 0 0.5rem 1rem rgba(var(--color-black-rgb), 0.2);
    }
`;

const linkStyles = css`
    color: var(--color-black);  
    background-color: transparent;
    border: none;
    box-shadow: none;
`;

const getCustomStyles = props => {
    if (props.isGoogle) {
        return googleStyles;
    } else if (props.isInverted) {
        return invertedStyles;
    } else if (props.isLink) {
        return linkStyles;
    } else {
        return defaultStyles;
    }
}

export const ButtonContainer = styled.button`
    border-radius: 3px;
    padding: 0 3.5rem;
    height: 5rem;
    min-width: 16.5rem;

    font-size: 1.5rem;
    font-weight: 700;
    font-family: inherit;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    box-shadow: 0 1rem 2rem rgba(var(--color-black-rgb), 0.2);
    transition: all 0.1s ease-in;
    cursor: pointer;

    ${getCustomStyles}
`;