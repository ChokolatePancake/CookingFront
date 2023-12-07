import React from 'react';
import {useGetRecentRecipesQuery} from "../../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import RecipeBlock from "../../../RecipeBlock/RecipeBlock";
import {Link} from "react-router-dom";
import styles from './RecentRecipes.module.scss';

const RecentRecipes = () => {
    const {data, isLoading, error} = useGetRecentRecipesQuery();
    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <div>
            <div className={styles.recipes}>
                {data.map((recipe) => (
                    <RecipeBlock recipe={recipe} key={recipe.id}/>
                ))}
            </div>
            <div className={styles.more_wrapper}>
                <Link className={styles.more} to={'/explore'}>View more</Link>
            </div>
        </div>
    );
};

export default RecentRecipes;