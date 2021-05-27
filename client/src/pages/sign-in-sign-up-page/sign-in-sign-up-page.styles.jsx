import styled from 'styled-components';

export const SignInSignUpPageContainer = styled.div`
    display: flex;
    gap: 10rem;
    justify-content: center;

    @media only screen and (max-width: 37.5em) {
      flex-direction: column;
      gap: 5rem;
  }
`;