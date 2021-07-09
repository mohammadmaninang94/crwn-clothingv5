import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assests/image/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';

import { HeaderContainer, LogoContainer, NavContainer, HeaderLink } from './header.styles';

const Header = ({ currentUser, signOut }) => (
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
            <CartIcon />
        </NavContainer>
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);