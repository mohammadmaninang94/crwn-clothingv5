import { CartPageContainer } from './cart-page.styles';

import CartTable from '../../components/cart-table/cart-table.component';

const CartPage = () => (
    <CartPageContainer>
        <CartTable sidebar={false}/>
    </CartPageContainer>
);

export default CartPage;