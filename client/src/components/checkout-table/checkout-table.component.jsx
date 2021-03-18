import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { convertToPHPCurrency } from '../../components/component.utils.js';

import {
    CheckoutTableContainer, CheckoutTableHeader,
    CheckoutTableBody, CheckoutTableFoot
} from './checkout-table.styles';

const CheckoutTable = ({ cartItems, cartTotalPrice }) => (
    <CheckoutTableContainer cellSpacing="0" cellPadding="0">
        <CheckoutTableHeader>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
            </tr>
        </CheckoutTableHeader>
        <CheckoutTableBody>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} item={item} />
            ))}
        </CheckoutTableBody>
        <CheckoutTableFoot>
            <tr>
                <td colSpan='3'>Total:</td>
                <td className='checkout-table__cart-total'>{convertToPHPCurrency(cartTotalPrice)}</td>
            </tr>
        </CheckoutTableFoot>
    </CheckoutTableContainer>
);

export default CheckoutTable;