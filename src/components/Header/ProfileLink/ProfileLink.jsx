import React from 'react';
import {Link} from "react-router-dom";
import {useProfileQuery} from "../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import Avatar from "../../../assets/icons/avatar.png";
import styles from "./ProfileLink.module.scss";

const ProfileLink = () => {
    const {data, error, isLoading} = useProfileQuery();
    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <div>
            <Link to='profile'>
                {data.picture ? <img className={styles.avatar} src={'http://localhost:8080/' + data.picture} alt="profile"/> : <img className={styles.avatar} src={Avatar} alt="avatar"/>}
            </Link>
        </div>
    );
};

export default ProfileLink;