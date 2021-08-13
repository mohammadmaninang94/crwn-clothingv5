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
        width: 100vw;
    }   
`;

export const CartFormSlug = styled.ul`
    display:flex;
    justify-content: center;
    font-size: 1.6rem;
    text-transform: none;
    list-style: none;
    margin-bottom: 5rem;

    @media only screen and (max-width: 37.5em) {
        margin: 1rem 1.5rem;
    }
`;

export const CartFormSlugItem = styled.li`
    color: ${props => props.isActive ?
        'var(--color-black-light)' : 'var(--color-black-lighter)'};

    &:not(:last-child):after {
        content: ">";
        font-weight: bold;
        padding: 1rem;
    }
`;

