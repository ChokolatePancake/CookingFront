import React, {useState} from 'react';
import {useProfileQuery} from "../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import ProfileRecipes from "./ProfileRecipes/ProfileRecipes";
import ProfileFavorite from "./ProfileFavorite/ProfileFavorite";
import {loginSuccess, logoutSuccess} from "../../../redux/features/authSlice";
import {useDispatch} from "react-redux";

const Profile = () => {
    const {data, isLoading, error} = useProfileQuery();
    const dispatch = useDispatch();
    if (isLoading) {
        return <CircularProgress />
    }
    const handleLogout = (e) => {
        e.preventDefault();
                dispatch(logoutSuccess());
    }
    return (
        <div>
            <button onClick={handleLogout}>Log out</button>
            <h1>Profile</h1>
            {data.picture ? <img src={'http://localhost:8080/' + data.picture} alt=""/> : ''}
            <div>Email: {data.email}</div>
            <div>NickName: {data.nickName}</div>
            <div>Description: {data.description}</div>
            <Link to='/profile/edit'>Edit</Link>
            <ProfileRecipes />
            <ProfileFavorite />
        </div>
    );
};

export default Profile;