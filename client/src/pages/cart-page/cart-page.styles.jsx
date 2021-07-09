import styled from 'styled-components';

export const CartPageContainer = styled.div`
    width: 50vw;
    margin: 5rem auto;
    font-size: 1.6rem;
    letter-spacing: .2rem;
    text-transform: uppercase;

    @media only screen and (max-width: 75em) {
        width: 90vw;
        margin: 2rem auto;
    }   

    @media only screen and (max-width: 37.5em) {
        width: 80vw;
    }   
`;