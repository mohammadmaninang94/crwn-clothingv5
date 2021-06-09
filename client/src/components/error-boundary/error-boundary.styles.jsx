import styled from 'styled-components';


export const ErrorImageFigure = styled.figure`
    display: flex;
    justify-content: center;    
    flex-direction: column;
    align-items: center;
`;

export const ErrorImage = styled.img`
    width: 40vh;
    height: 40vh;
`;

export const ErrorImageCaption = styled.figcaption`
    font-size: 3rem;
    color: var(--color-black);
    margin-top: 2rem;
`;