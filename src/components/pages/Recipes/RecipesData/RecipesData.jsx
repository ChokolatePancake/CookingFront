import React, {useEffect, useState} from 'react';
import RecipeBlock from "../../../RecipeBlock/RecipeBlock";
import {CircularProgress, Pagination} from "@mui/material";
import {useGetRecipesMutation} from "../../../../redux/api/cookingForumApi";

const RecipesData = ({categories, timeAfter, timeBefore, date}) => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(0);
    const [getRecipes, {data, isLoading}] = useGetRecipesMutation();
    let recipesBody = {
        date,
        page,
        categories,
        timeBefore,
        timeAfter
    };
    useEffect(() => {
        getRecipes(recipesBody).unwrap().then((data) => setRecipes(data));
    }, [page, categories, timeBefore, timeAfter, date]);
    if (isLoading || !recipes) {
        return <CircularProgress />
    }
    return (
        <div>
            {typeof recipes.data != 'undefined' ? recipes.data.map((recipe) => (
                <RecipeBlock key={recipe.id} recipe={recipe} />
            )) : ''}
            {recipes.count / 12 > 1 ? <Pagination count={Math.ceil(recipes.count / 12)} page={page + 1} onChange={(e, value) => setPage(value - 1)} /> : ''}
        </div>
    );
};

export default RecipesData;