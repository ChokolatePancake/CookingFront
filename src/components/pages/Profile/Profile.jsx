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
            <div className={styles.allitems}>
                {data.picture ? <img className={styles.image} src={'http://localhost:8080/' + data.picture} alt=""/> : ''}
                <div className={styles.items}>
                    <h1>Profile</h1>
                    <div>Email: {data.email}</div>
                    <div>NickName: {data.nickName}</div>
                    <div>Description: {data.description}</div>
                </div>
            </div>
        <div className={styles.buttoncontainer}>
            <div><Link to='/profile/edit'>


                <svg fill="#253D4E" height="25px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.637 306.637">
                    <title>Edit Profile</title>
                    <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
			l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"/>
                            <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
			L265.13,75.602L231.035,41.507z"/>
                </svg>
            </Link></div>
            <div><Link to='/recipe/add'>
                <svg fill="#253D4E" height="25px" width="30px" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M515.863273 1024c-282.321455 0-512-229.678545-512-512 0-282.298182 229.678545-512 512-512s512 229.701818 512 512C1027.863273 794.321455 798.184727 1024 515.863273 1024zM515.863273 44.520727C258.094545 44.520727 48.384 254.231273 48.384 512s209.710545 467.502545 467.479273 467.502545S983.342545 769.768727 983.342545 512 773.632 44.520727 515.863273 44.520727z"/>
                    <path d="M750.126545 531.549091c-4.026182 4.002909-9.565091 6.516364-15.732364 6.516364L298.449455 538.065455c-12.311273 0-22.272-9.960727-22.272-22.272 0-12.288 9.960727-22.248727 22.248727-22.248727l435.968 0c12.334545-0.023273 22.295273 9.937455 22.272 22.248727C756.689455 521.960727 754.176 527.522909 750.126545 531.549091z"/><path d="M531.595636 751.127273c-4.026182 4.026182-9.611636 6.516364-15.732364 6.493091-12.334545 0.023273-22.295273-9.960727-22.272-22.248727l-0.023273-446.72c0-12.288 9.960727-22.248727 22.272-22.248727 12.311273 0 22.272 9.960727 22.248727 22.248727l0 446.72C538.088727 741.515636 535.621818 747.124364 531.595636 751.127273z"/>
                <title>Add Recipe</title>
                </svg>
            </Link></div>
        </div>
                <ProfileRecipes />
            <ProfileFavorite />
        </div>
        </div>
    );
};

export default Profile;