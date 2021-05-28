import styled from 'styled-components';

import CustomButton from '../custom-button/custom-button.component';

export const CollectionItemImg = styled.img`
    width: 100%;
    height: 90%;
    object-fit: cover;
`;

export const CollectionItemButton = styled(CustomButton)`
    width: 80%;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
    display: none;
`;

export const CollectionItemContainer = styled.figure`
    height: 35rem;
    width: 100%;
    position: relative;

    &:hover,
    &:active {
        ${CollectionItemImg}{
            opacity: .8;
        }

        ${CollectionItemButton}{
            display: block;
        }
    }

    @media only screen and (max-width: 86em) {
        &:hover,
        &:active {
            ${CollectionItemImg}{
                opacity: 1;
            }

            ${CollectionItemButton}{
                opacity: 1;
            }
        }

        ${CollectionItemButton}{
            opacity: .8;
            display: block;
        }
    }
`;

export const CollectionItemFigCaption = styled.figcaption`
    display: flex;
    justify-content: space-between;
`;

export const CollectionItemTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 300;
`;

export const CollectionItemPrice = styled.b`
    font-size: 1.8rem;
`;

