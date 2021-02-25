import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assests/image/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.conponent';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <header className='header'>
        <NavLink className='header__link header__link-logo' activeClassName='header__link--active' exact to='/'>
            <Logo />
        </NavLink>
        <nav className='header__nav-links'>
            <NavLink className='header__link' activeClassName='header__link--active' to='/shop'>shop</NavLink>
            <NavLink className='header__link' activeClassName='header__link--active' to='/contact'>contact</NavLink>
            {currentUser ?
                <div className='header__link' onClick={() => auth.signOut()}>sign out</div>
                :
                <NavLink className='header__link' activeClassName='header__link--active' to='/signin'>sign in</NavLink>
            }
            <CartIcon />
        </nav>
        {hidden ? null : (<CartDropdown />)}
    </header>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);