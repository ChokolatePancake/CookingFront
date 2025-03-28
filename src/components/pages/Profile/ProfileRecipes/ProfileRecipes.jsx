import React from 'react';
import {useProfileRecipesQuery} from "../../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import styles from './ProfileRecipes.module.scss';
import RecipeBlock from "../../../RecipeBlock/RecipeBlock";

const ProfileRecipes = () => {
    const {data, isLoading, error} = useProfileRecipesQuery();
    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <div>
            <h2 className={styles.title}>My recipes</h2>
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

export default ProfileRecipes;