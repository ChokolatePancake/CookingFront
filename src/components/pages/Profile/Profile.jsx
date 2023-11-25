import React, {useState} from 'react';
import {cookingForumApi, useProfileQuery} from "../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import ProfileRecipes from "./ProfileRecipes/ProfileRecipes";
import ProfileFavorite from "./ProfileFavorite/ProfileFavorite";
import {loginSuccess, logoutSuccess} from "../../../redux/features/authSlice";
import {useDispatch} from "react-redux";
import styles from './profile.module.scss';

const Profile = () => {
    const {data, isLoading, error} = useProfileQuery();
    const dispatch = useDispatch();
    if (isLoading) {
        return <CircularProgress />
    }
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(cookingForumApi.util.resetApiState());
        dispatch(logoutSuccess());
    }
    return (
        <div><button className={styles.logout} onClick={handleLogout}>Log out</button>
    <div className={styles.profile}>
            <h1>Profile</h1>
            <div className={styles.allitems}>
                {data.picture ? <img className={styles.image} src={'http://localhost:8080/' + data.picture} alt=""/> : ''}
                <div className={styles.items}>
                    <div>Email: {data.email}</div>
                    <div>NickName: {data.nickName}</div>
                    <div>Description: {data.description}</div>
                </div>
            </div>
        <div className={styles.buttoncontainer}>
            <div className={styles.button}><Link to='/profile/edit'>Edit</Link></div>
            <div className={styles.button}><Link to='/recipe/add'>Add Recipe</Link></div>
        </div>
                <ProfileRecipes />
            <ProfileFavorite />
        </div>
        </div>
    );
};

export default Profile;