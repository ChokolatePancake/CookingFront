import React from 'react';
import {useProfileQuery} from "../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";

const Profile = () => {
    const {data, isLoading, error} = useProfileQuery();
    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <div>
            <h1>Profile</h1>
            <div>Email: {data.email}</div>
            <div>NickName: {data.nickName}</div>
        </div>
    );
};

export default Profile;