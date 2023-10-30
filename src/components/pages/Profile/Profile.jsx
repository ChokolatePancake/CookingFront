import React from 'react';
import {useProfileQuery} from "../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";

const Profile = () => {
    const {data, isLoading, error} = useProfileQuery();
    if (isLoading) {
        return <CircularProgress />
    }
    console.log(data);
    const picture = data.picture;
    return (
        <div>
            <h1>Profile</h1>
            <img src={`http://localhost:8080/` . picture} alt=""/>
            <div>Email: {data.email}</div>
            <div>NickName: {data.nickName}</div>
        </div>
    );
};

export default Profile;