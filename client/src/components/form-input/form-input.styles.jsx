import styled, { css } from 'styled-components';

const shrinkLabel = css`
  top: -1.5rem;
  font-size: 1.2rem;
  color: var(--color-black);
`;

export const CustomInputContainer = styled.div`
  margin: 4.5rem 0;
  position: relative;
`;

export const CustomLabel = styled.label`
    display: block;
    position: absolute;
    top: 10px;
    left: 5px;
    font-size: 1.6rem;
    color: var(--color-black-light);
    transition: all 300ms ease;
    pointer-events: none;

    ${({ hasValue }) => hasValue ? shrinkLabel : null}
`;

export const CustomInput = styled.input`
    display: block;
    width: 100%;
    padding: 1rem 1rem 1rem 0.5rem;
    margin: 2.5rem 0;
    background-color: var(--color-white);
    border: none;
    border-bottom: 1px solid var(--color-black-light);
    font-size: 1.8rem;
    transition: all 300ms ease;

    &:focus {
      outline: transparent;
    }

    &:focus:invalid {
      border-bottom: 1px solid var(--color-red);
    }

    &:focus  + ${CustomLabel} {
      ${shrinkLabel}
    }
`;