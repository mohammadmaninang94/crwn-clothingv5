import styled from 'styled-components';

export const CheckoutTableContainer = styled.table`
    width: 100%;

    & th,
    & td {
        border-bottom: 1px solid var(--color-black);
    }
`;

export const CheckoutTableHeader = styled.thead`
    font-size: 1.6rem;
    & th {
      font-weight: normal;
      padding-bottom: 2rem;
    }
`;

export const CheckoutTableBody = styled.thead`
    font-size: 2rem;
`;

export const CheckoutTableFoot = styled.thead`
    td {
        padding-top: 3rem;
        border-bottom: none;
        text-align: right;

        font-size: 3.6rem;
        font-weight: normal;
    }
`;