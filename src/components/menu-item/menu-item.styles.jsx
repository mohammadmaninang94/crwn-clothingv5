import styled, { css } from 'styled-components';

const hatsStyles = css`
    grid-column: col-start 1 / col-end 2;
`;

const jacketsStyles = css`
    grid-column: col-start 3 / col-end 4;
`;

const sneakersStyles = css`
    grid-column: col-start 5 / col-end 7;
`;

const womensStyles = css`
    grid-column: col-start 1 / col-end 3;
    grid-row: 2 / 3;
`;

const mensStyles = css`
    grid-column: col-start 4 / col-end 7;
    grid-row: 2 / 3;;
`;

const getMenuItemStyles = props => {
    switch (props.title) {
        case 'hats':
            return hatsStyles;
        case 'jackets':
            return jacketsStyles;
        case 'sneakers':
            return sneakersStyles;
        case 'womens':
            return womensStyles;
        case 'mens':
            return mensStyles;
        default:
            return null;
    }
};

export const BackgroundImageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    transition: all 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    background-image: ${props => `url(${props.imageUrl})`};
`;

export const ContentContainer = styled.div`
    height: 9rem;
    padding: 0 2.5rem;
    background-color: var(--color-white);
    border: 1px solid var(--color-black-light);
    opacity: 0.7;
    position: absolute;
    transition: all 1s;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MenuItemContainer = styled.div`
    height: 100%;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--color-black-light);

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    ${getMenuItemStyles}

    &:hover ${BackgroundImageContainer},
    &:active ${BackgroundImageContainer} {
        transform: scale(1.1);
    }

    &:hover ${ContentContainer},
    &:active ${ContentContainer} {
        opacity: .9;
    }
`;

export const ContentTitle = styled.h2`
    font-size: 2.2rem;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--color-black-light);
    margin-bottom: 6px;
`;

export const ContentSubtitle = styled.span`
    font-size: 1.6rem;
    text-transform: uppercase;
`;