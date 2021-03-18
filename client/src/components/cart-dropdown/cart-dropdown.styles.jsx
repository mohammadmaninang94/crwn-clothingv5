import styled from 'styled-components';

import CustomButton from '../custom-button/custom-button.component';

export const CartDropdownContainer = styled.div`
    position: absolute;
    right: 40px;
    top: 100px;

    height: 34rem;
    width: 24rem;
    padding: 2rem;
    border: 1px solid var(--color-black-light);
    z-index: 5;

    background-color: var(--color-white);
`;

export const CartDropdownItems = styled.div`
    height: 80%;
    width: 100%;
    margin-bottom: 1.5rem;
    overflow-y: ${({ itemsCount }) => itemsCount > 2 ? 'scroll' : 'none'};
`;

export const CartDropdownButton = styled(CustomButton)`
    margin: 0 auto;
    display: block;
`;

export const CartDropdownEmptyMessage = styled.span`
    display: block;
    font-size: 1.8rem;
    margin: auto;
    padding: 5rem 0;
    width: fit-content;
`;