import styled, { css } from 'styled-components';

import CustomButton from '../../components/custom-button/custom-button.component';

const getCartHeaderStyles = ({ sidebar }) => {
    if (sidebar) {
        return css`
            display: none;  
        `;
    }
    return css`
        display: table-header-group;   
    
        @media only screen and (max-width: 37.5em) {
            display: none;
        } 
    `;
}

export const CartTableContainer = styled.div`
    display: ${props => props.sidebar ? 'block' : 'table'}; 
    width: 100%;
    border-spacing: 0 30px;
    height: 80vh;
    overflow:auto;
`;

export const CartHeader = styled.div`
    ${getCartHeaderStyles}
`;

export const CartHeaderCell = styled.span`
    display: table-cell; 
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
    text-align: ${props => props.textAlign ? props.textAlign : 'center'};
`;

export const CartFooter = styled.div`
    padding-top: 25px;
    border-top: 1px solid #ddd;
    ${props => props.sidebar ?
        `display: block;`
        :
        `display: flex;
        justify-content: flex-end;`
    }

    @media only screen and (max-width: 37.5em) {
        display: block;
    } 
`;

export const CartFooterCell = styled.div`
    text-align: ${props => props.textAlign ? props.textAlign : 'center'};
`;

export const CartTotalContainer = styled.div``;
export const CartTotalTitle = styled.span`
    padding-right: .5rem;
`;
export const CartTotalPrice = styled.strong``;
export const CartCheckoutMessage = styled.p`
    letter-spacing: 0;
    color: var(--color-grey);
    font-family: var(--font-nunito);
    font-weight: 400;
    font-style: normal;
    margin-bottom: 2rem;
    text-transform: none;
`;

export const CartCheckoutButton = styled(CustomButton)`
    letter-spacing: .2rem;

    ${props => props.sidebar ?
        `width: 100%;` : ''
    }

    @media only screen and (max-width: 37.5em) {
        width: 100%;
    } 
`;

export const CartPageEmpty = styled.p`
    font-size: 3rem;
    font-weight: normal;
    margin: auto;
    width: fit-content;
`;