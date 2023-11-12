import React from 'react';
import Logo from '../../assets/icons/logo.png'
import Search from "./Search/Search";
import Navigation from "./Navigation/Navigation";
import ProfileLink from "./ProfileLink/ProfileLink";
import styles from './Header.module.scss'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
    return (
        <div className={styles.header}>
            <img className={styles.logo} src={Logo} alt="logo"/>
            <Search />
            <Navigation />
          {isAuth ? <ProfileLink /> : <Link to={'/login'}>Login</Link>}
        </div>
    );
};

export default Header;