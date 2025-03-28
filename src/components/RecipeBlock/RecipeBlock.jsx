import React from 'react';
import RecipeAddToFavorite from "../RecipeAddToFavorite/RecipeAddToFavorite";
import styles from './RecipeBlock.module.scss';
import defaultImagw from '../../assets/recipe_default.jpg'
import {Link} from "react-router-dom";
import {useIsRecipesAuthorQuery} from "../../redux/api/cookingForumApi";
import DeleteRecipe from "../DeleteRecipe/DeleteRecipe";
import {CircularProgress} from "@mui/material";

const trimmedString = (string, maxLength) => {
    if (string.length > maxLength) {
        return string.substring(0, maxLength) + '...';
    } else {
        return string;
    }
}

const RecipeBlock = ({recipe}) => {
    const isAuthor = useIsRecipesAuthorQuery(recipe.id);
    if (isAuthor.isLoading) {
        return <CircularProgress />
    }
    return (

            <div className={styles.recipe}>
                <Link style={{textDecoration: 'none'}} to={`/recipe/${recipe.id}`}>
                {recipe.picture ? <img className={styles.picture} src={'http://localhost:8080/' + recipe.picture} alt="recipe"/> :
                    <img className={styles.picture} src={defaultImagw} alt="recipe"/>}
                </Link>
                <div className={styles.info}>
                    <div className={styles.category}>{recipe.category.slice(0, 3).join(', ')}</div>
                    <Link style={{textDecoration: 'none'}} to={`/recipe/${recipe.id}`}>
                        <h3 className={styles.title}>{trimmedString(recipe.name, 35)}</h3>
                    </Link>
                    <div className={styles.favorite_time}>
                        <div className={styles.time}>{recipe.time + ' min'}</div>
                        <div className={styles.actions}>
                            {isAuthor.data ? <DeleteRecipe recipeId={recipe.id} /> : ''}
                            <RecipeAddToFavorite recipeId={recipe.id} />
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default RecipeBlock;