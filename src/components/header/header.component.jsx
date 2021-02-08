import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assests/image/4.2 crown.svg';

import './header.styles.scss';

const Header = () => (
    <header className='header'>
        <NavLink className='header__link header__link-logo' activeClassName='header__link--active' exact to='/'>
            <Logo />
        </NavLink>
        <nav className='header__nav-links'>
            <NavLink className='header__link' activeClassName='header__link--active' to='/shop'>shop</NavLink>
            <NavLink className='header__link' activeClassName='header__link--active' to='/contact'>contact</NavLink>
            <NavLink className='header__link' activeClassName='header__link--active' to='/signin'>sign in</NavLink>
            <NavLink className='header__link' activeClassName='header__link--active' to='/'>cart</NavLink>
        </nav>
    </header>
);

export default Header;