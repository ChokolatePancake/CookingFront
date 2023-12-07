import React from 'react';
import {useGetFavoritesQuery} from "../../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import styles from './ProfileFavorite.module.scss';
import RecipeBlock from "../../../RecipeBlock/RecipeBlock";

const ProfileFavorite = () => {
    const {data, isLoading, error} = useGetFavoritesQuery();
    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <div>
            <h2 className={styles.title}>My favorites</h2>
            <div className={styles.recipes}>
            {
                data.map((recipe) =>
                        <RecipeBlock recipe={recipe} />
                )
            }
            </div>
        </div>
    );
};

export default ProfileFavorite;