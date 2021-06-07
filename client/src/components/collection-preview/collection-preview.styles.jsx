import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
    margin-bottom: 3rem;
    cursor: pointer;
`;

export const CollectionPreviewTitle = styled.h2`
    font-size: 2.8rem;
    font-weight: 700;
    text-transform: uppercase;
`;

export const CollectionPreviewItems = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22.5rem, 1fr));
    column-gap: 4.5rem;
    row-gap: 2rem;

    justify-content: space-between;
    margin-top: 2.5rem;
`;