import styled from 'styled-components';

export const SignUpContainer = styled.div`
  width: 38rem;

  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }
`;

export const SignUpTitle = styled.h2`
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 1rem;
`;

export const SignUpParagraph = styled.p`
    font-size: 1.6rem;
`;

export const SignUpButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 37.5em) {
    flex-direction: column;
    gap:1rem;
  }
`;