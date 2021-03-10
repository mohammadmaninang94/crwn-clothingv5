import styled from 'styled-components';

export const CollectionPageTitle = styled.div`
    display: block;
    font-size: 3.8rem;
    margin: 0 auto 3rem;
    width: fit-content;
`;

export const CollectionPageItems = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22vw, 1fr));
    justify-content: center;
    column-gap: 2rem;
    row-gap: 2rem;
`;