import React from 'react';
import RecipeAddToFavorite from "../RecipeAddToFavorite/RecipeAddToFavorite";
import styles from './RecipeBlock.module.scss';
import defaultImagw from '../../assets/recipe_default.jpg'
import {Link} from "react-router-dom";

const RecipeBlock = ({recipe}) => {
    return (

            <div className={styles.recipe}>
                <Link style={{textDecoration: 'none'}} to={`/recipe/${recipe.id}`}>
                {recipe.picture ? <img className={styles.picture} src={'http://localhost:8080/' + recipe.picture} alt="recipe"/> :
                    <img className={styles.picture} src={defaultImagw} alt="recipe"/>}
                </Link>
                <div className={styles.info}>
                    <div className={styles.category}>{recipe.category.slice(0, 3).join(', ')}</div>
                    <Link style={{textDecoration: 'none'}} to={`/recipe/${recipe.id}`}>
                        <h3 className={styles.title}>{recipe.name}</h3>
                    </Link>
                    <div className={styles.favorite_time}>
                        <div className={styles.time}>{recipe.time + ' min'}</div>
                        <RecipeAddToFavorite recipeId={recipe.id} />
                    </div>
                </div>
            </div>
    );
};

export default RecipeBlock;