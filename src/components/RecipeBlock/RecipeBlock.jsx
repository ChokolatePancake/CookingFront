import React from 'react';
import RecipeAddToFavorite from "../RecipeAddToFavorite/RecipeAddToFavorite";
import {useSelector} from "react-redux";

const RecipeBlock = ({recipe}) => {
    return (
        <div>
            {recipe.picture ? <img src={'http://localhost:8080/' + recipe.picture} alt="recipe"/> :
                <img src="" alt=""/>}
            <div>{recipe.category.slice(0, 3).join(', ')}</div>
            <h3>{recipe.name}</h3>
            <div>
                <div>{recipe.time + ' min'}</div>
                <RecipeAddToFavorite recipeId={recipe.id} />
            </div>
        </div>
    );
};

export default RecipeBlock;