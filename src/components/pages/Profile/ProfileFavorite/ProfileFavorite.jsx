import React from 'react';
import {useGetFavoritesQuery} from "../../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import styles from './ProfileFavorite.module.scss';

const ProfileFavorite = () => {
    const {data, isLoading, error} = useGetFavoritesQuery();
    if (isLoading) {
        return <CircularProgress />
    }
    console.log(data)
    return (
        <div>
            <h2>My favorite</h2>
            {
                data.map((recipe) =>
                    <div className={styles.recipes}>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                    </div>
                )
            }
        </div>
    );
};

export default ProfileFavorite;