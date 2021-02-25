import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotalPrice } from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { convertToPHPCurrency } from '../../components/component.utils.js';

import './checkout-table.styles.scss';

const CheckoutTable = ({ cartItems, cartTotalPrice }) => (
    <table className='checkout-table' cellSpacing="0" cellPadding="0">
        <thead className='checkout-table__head'>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
        </thead>
        <tbody className='checkout-table__body'>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} item={item} />
            ))}
        </tbody>
        <tfoot className='checkout-table__foot'>
            <tr>
                <td colSpan='3'>Total:</td>
                <td className='checkout-table__cart-total'>{convertToPHPCurrency(cartTotalPrice)}</td>
            </tr>
        </tfoot>
    </table>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotalPrice: selectCartTotalPrice
});

export default connect(mapStateToProps)(CheckoutTable);