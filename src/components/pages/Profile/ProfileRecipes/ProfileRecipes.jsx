import React from 'react';
import {useProfileRecipesQuery} from "../../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import styles from './ProfileRecipes.module.scss';

const ProfileRecipes = () => {
    const {data, isLoading, error} = useProfileRecipesQuery();
    if (isLoading) {
        return <CircularProgress />
    }
    console.log(data);
    return (
        <div>
            <h2>My recipes</h2>
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

export default ProfileRecipes;