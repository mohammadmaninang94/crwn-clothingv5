import { convertToPHPCurrency } from '../component.utils';

import './cart-item.styles.scss';

const CartItem = ({ item: { name, imageUrl, price, quantity } }) => (
    <div className='cart-item'>
        <img src={imageUrl} alt='item' className='cart-item__img'/>
        <div className='cart-item__details'>
            <span className='cart-item__name'>{name}</span>
            <span className='cart-item__price'>{quantity} &times; {convertToPHPCurrency(price)}</span>
        </div>
    </div>
);

export default CartItem;