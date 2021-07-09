import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CartTable from '../../components/cart-table/cart-table.component';

import {
    CartSidebarContainer, CartClose,
    CartSidebarTitle, SidebarHeader
} from './cart-sidebar.styles';

const CartSidebar = ({ hidden, toggelCartHidden }) => (
    <CartSidebarContainer hidden={hidden}>
        <SidebarHeader>
            <CartSidebarTitle>Cart</CartSidebarTitle>
            <CartClose onClick={toggelCartHidden}>&times;</CartClose>
        </SidebarHeader>
        <CartTable sidebar={true} />
    </CartSidebarContainer>
);

const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    toggelCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartSidebar);