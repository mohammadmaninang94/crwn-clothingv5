import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useLocation } from 'react-router-dom';

import pageRoutes from '../../assests/data/route.data';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assests/image/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';

import { HeaderContainer, LogoContainer, NavContainer, HeaderLink } from './header.styles';

const Header = ({ currentUser, signOut }) => {
    const location = useLocation();
    const { CHECKOUT, CART } = pageRoutes;
    return (
        <HeaderContainer>
            <LogoContainer activeClassName='header__link--active' exact to='/'>
                <Logo />
            </LogoContainer>
            <NavContainer>
                <HeaderLink activeClassName='header__link--active' to='/shop'>shop</HeaderLink>
                <HeaderLink activeClassName='header__link--active' to='/contact'>contact</HeaderLink>
                {currentUser ?
                    <HeaderLink as='div' onClick={() => signOut()}>sign out</HeaderLink>
                    :
                    <HeaderLink activeClassName='header__link--active' to='/signin'>sign in</HeaderLink>
                }
                {location.pathname === CHECKOUT || location.pathname === CART ?
                    null : <CartIcon />
                }

            </NavContainer>
        </HeaderContainer>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);