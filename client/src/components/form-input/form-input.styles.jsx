import styled, { css } from 'styled-components';

const shrinkLabel = css`
  top: 1.3rem;
  font-size: 1.5rem;
  color: var(--color-black);
`;

export const CustomInputContainer = styled.div`
  margin-top: 2rem;
  position: relative;

  @media only screen and (max-width: 37.5em) {
      width: 100%;
  }
`;

export const CustomLabel = styled.label`
    display: block;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 1.6rem;
    color: var(--color-black-light);
    transition: all 300ms ease;
    pointer-events: none;

    ${({ hasValue }) => hasValue ? shrinkLabel : null}
`;

export const CustomInput = styled.input`
    display: ${({ type }) => type === 'radio' ? 'none' : 'block'} ;
    width: 100%;
    padding: 2.5rem 1rem .5rem 1rem;
    background-color: var(--color-white);
    border: 1px solid var(--color-black-lighter);
    border-radius: 5px;
    font-size: 1.6rem;
    transition: all 300ms ease;

    &:focus {
      outline: transparent;
      border-width: 2px;
      border-color: var(--color-black-light);
    }

    &:focus:invalid {
      border-bottom: 2px solid var(--color-red);
    }

    &:focus  + ${CustomLabel} {
      ${shrinkLabel}
    }
`;

export const CustomRadioLabel = styled.label`
    font-size: 1.6rem;
    cursor: pointer;
    position: relative;
    padding-left: 4.5rem;
    position: relative;

    @media only screen and (max-width: 37.5em) {
        width: 100%;
    }
`;

export const CustomRadioSpan = styled.span`
    height: 2rem;
    width: 2rem;
    border: 2px solid var(--color-black-lighter);
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;

    ${CustomInput}:checked + &::after {
      opacity: 1;
    }

    &::after {
      content: "";
      display: block;
      height: 1.3rem;
      width: 1.3rem;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--color-black-light);
      opacity: 0;
      transition: opacity .2s;
    }
`;