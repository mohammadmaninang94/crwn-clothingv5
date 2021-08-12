import { CartPageContainer, CartFormSlug, CartFormSlugItem } from './cart-page.styles';

import CartTable from '../../components/cart-table/cart-table.component';

const CartPage = () => (
    <CartPageContainer>
        <CartFormSlug>
            <CartFormSlugItem isActive={true}>Cart</CartFormSlugItem>
            <CartFormSlugItem>Shipping Information</CartFormSlugItem>
            <CartFormSlugItem>Payment Method</CartFormSlugItem>
        </CartFormSlug>
        <CartTable sidebar={false} />
    </CartPageContainer>
);

export default CartPage;