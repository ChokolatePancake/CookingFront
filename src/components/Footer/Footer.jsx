import React from 'react';
import Logo from "../../assets/icons/logo.png";
import {Link} from "react-router-dom";
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link to={"/"}><img className={styles.logo} src={Logo} alt="logo"/></Link>
            <p className={styles.text}>CookingForum is a recipe website with a wide variety of delicious recipes, easy-to-use search function. Join our community and let's cook together!</p>
        </footer>
    );
};

export default Footer;