import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assests/image/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.conponent';

import { HeaderContainer, LogoContainer, NavContainer, HeaderLink } from './header.styles';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer activeClassName='header__link--active' exact to='/'>
            <Logo />
        </LogoContainer>
        <NavContainer>
            <HeaderLink activeClassName='header__link--active' to='/shop'>shop</HeaderLink>
            <HeaderLink activeClassName='header__link--active' to='/contact'>contact</HeaderLink>
            {currentUser ?
                <HeaderLink as='div' onClick={() => auth.signOut()}>sign out</HeaderLink>
                :
                <HeaderLink activeClassName='header__link--active' to='/signin'>sign in</HeaderLink>
            }
            <CartIcon />
        </NavContainer>
        {hidden ? null : (<CartDropdown />)}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);