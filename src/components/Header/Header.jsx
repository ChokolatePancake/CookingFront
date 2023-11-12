import React from 'react';
import Logo from '../../assets/icons/logo.png'
import Search from "./Search/Search";
import Navigation from "./Navigation/Navigation";
import ProfileLink from "./ProfileLink/ProfileLink";
import styles from './Header.module.scss'

const Header = () => {
    return (
        <div className={styles.header}>
            <img className={styles.logo} src={Logo} alt="logo"/>
            <Search />
            <Navigation />
            <ProfileLink />
        </div>
    );
};

export default Header;