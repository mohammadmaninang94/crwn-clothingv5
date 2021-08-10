
import { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { convertToPHPCurrency } from '../../components/component.utils';

import { selectCartItems, selectCartTotalPrice } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CartItem from '../../components/cart-item/cart-item.component';

import {
    CartTableContainer, CartHeader, CartHeaderCell,
    CartFooter, CartFooterCell, CartTotalContainer,
    CartTotalTitle, CartTotalPrice, CartCheckoutMessage,
    CartCheckoutButton
} from './cart-table.styles';

const CartTable = ({ cartItems, cartTotalPrice, sidebar, history, toggelCartHidden }) => (
    <Fragment>
        <CartTableContainer sidebar={sidebar}>
            <CartHeader sidebar={sidebar}>
                <CartHeaderCell textAlign='left'>Product</CartHeaderCell>
                <CartHeaderCell>Price</CartHeaderCell>
                <CartHeaderCell>Quantity</CartHeaderCell>
                <CartHeaderCell textAlign='right'>Total</CartHeaderCell>
            </CartHeader>
            {cartItems.length ?
                cartItems.map(item => (
                    <CartItem sidebar={sidebar} key={item.id} item={item} />
                )) : null
            }
        </CartTableContainer>
        <CartFooter sidebar={sidebar}>
            <CartFooterCell textAlign='right'>
                <CartTotalContainer>
                    <CartTotalTitle>Total:</CartTotalTitle>
                    <CartTotalPrice>{convertToPHPCurrency(cartTotalPrice)}</CartTotalPrice>
                </CartTotalContainer>
                <CartCheckoutMessage>Shipping & taxes calculated at checkout</CartCheckoutMessage>
                <CartCheckoutButton sidebar={sidebar} onClick={() => {
                    history.push('/checkout');
                    toggelCartHidden(true);
                }}>Checkout</CartCheckoutButton>
            </CartFooterCell>
        </CartFooter>
    </Fragment>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotalPrice: selectCartTotalPrice
});

const mapDispatchToProps = dispatch => ({
    toggelCartHidden: toggle => dispatch(toggleCartHidden(toggle))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartTable));