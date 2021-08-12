import styled from 'styled-components';

export const DirectoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, [col-start] 1fr [col-end]);
    grid-template-rows: 25vh 40vh;
    grid-gap: 1.6rem;

    @media only screen and (max-width: 37.5em) {
        grid-template-rows: 25vh;
        grid-auto-rows: 25vh;
        padding: 0 2rem;
    }
`;