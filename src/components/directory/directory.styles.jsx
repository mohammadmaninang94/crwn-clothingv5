import styled from 'styled-components';

export const DirectoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, [col-start] 1fr [col-end]);
    grid-template-rows: 25vh 40vh;
    grid-gap: 1.6rem;
`;