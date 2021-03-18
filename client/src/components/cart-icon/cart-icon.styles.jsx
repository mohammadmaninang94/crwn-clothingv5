import styled from 'styled-components';
import { ReactComponent as ShoppingIconSVG } from '../../assests/image/shopping-bag.svg';

export const CartIconContainer = styled.div`
    position: relative;
    cursor: pointer;
`;

export const ShoppingIcon = styled(ShoppingIconSVG)`
    height: 2.4rem;
    width: 2.4rem;
`;

export const ItemCountContainer = styled.span`
    font-size: 1rem;
    font-weight: bold;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
`;