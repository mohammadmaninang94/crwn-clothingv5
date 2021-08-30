import styled from 'styled-components';

export const FormSelectContainer = styled.div`
    width: 100%;   
    position: relative; 
`;

export const CustomFormSelect = styled.select`
    width: 100%;
    margin: 2rem 0 0 0;
    color: var(--color-black-light);
    border: 1px solid var(--color-black-lighter);
    border-radius: 5px;
    font-size: inherit;
    padding: 1.2rem 0 1.2rem .5rem;
    letter-spacing: .1rem;

    & option{
        text-transform: capitalize;
    }
`;

export const CustomFormLabel = styled.label`
    display: none;
`;