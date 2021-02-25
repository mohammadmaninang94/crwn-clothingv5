import { convertToPHPCurrency } from '../../components/component.utils.js';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item: { name, imageUrl, price, quantity } }) => (
    <tr className='checkout-item'>
        <td>
            <figure className='checkout-item__product'>
                <img src={imageUrl} alt={name} className='checkout-item__img' />
                <figcaption>{name}</figcaption>
            </figure>
        </td>
        <td>{quantity}</td>
        <td>{convertToPHPCurrency(price)}</td>
        <td><div>&#10005;</div></td>
    </tr>
);

export default CheckoutItem