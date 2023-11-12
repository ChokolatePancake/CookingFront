import React from 'react';
import {useProfileQuery} from "../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import ProfileRecipes from "./ProfileRecipes/ProfileRecipes";
import ProfileFavorite from "./ProfileFavorite/ProfileFavorite";

const Profile = () => {
    const {data, isLoading, error} = useProfileQuery();
    if (isLoading) {
        return <CircularProgress />
    }
    const picture = data.picture;
    return (
        <div>
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