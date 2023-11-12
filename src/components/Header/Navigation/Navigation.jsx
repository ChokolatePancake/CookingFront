import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './Navigation.module.scss';

const Navigation = () => {
    return (
        <div className={styles.navigation}>
            <NavLink className={styles.item} to='/'>Home</NavLink>
            <NavLink className={styles.item} to='/explore'>Explore</NavLink>
        </div>
    );
};

export default Navigation;