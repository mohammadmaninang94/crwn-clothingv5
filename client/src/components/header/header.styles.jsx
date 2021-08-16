import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderContainer = styled.div`
    height: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: .1em;

    @media only screen and (max-width: 56.25em) {
      height: 7rem;
      margin: 1rem;
    }
`;

export const LogoContainer = styled(NavLink)`
    flex: 0 0 7rem;
`;

export const NavContainer = styled.nav`
    flex: 0 0 calc(100% - 7rem);
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const HeaderLink = styled(NavLink)`
    &,
    &:link,
    &:visited {
      font-size: 1.6rem;
      text-transform: uppercase;
      text-decoration: none;
      padding: 1rem 1.5rem;
      color: var(--color-black);
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
`;