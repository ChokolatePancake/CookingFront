import React, {useEffect, useState} from 'react';
import RecipeBlock from "../../../RecipeBlock/RecipeBlock";
import {CircularProgress, Pagination} from "@mui/material";
import {useGetRecipesMutation} from "../../../../redux/api/cookingForumApi";
import usePrevious from "../../../../hooks/usePrevious";
import styles from './RecipesData.module.scss';

const RecipesData = ({categories, timeAfter, timeBefore, date}) => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(0);
    const [getRecipes, {data, isLoading}] = useGetRecipesMutation();
    let previousPage = usePrevious(page);
    let recipesBody = {
        date,
        page,
        categories,
        timeBefore,
        timeAfter
    };
    useEffect(() => {
        console.log(categories);
        if (previousPage == page) {
            setPage(0);
        }
        getRecipes(recipesBody).unwrap().then((data) => setRecipes(data)).catch((e) => console.log(e));
    }, [page, categories, timeBefore, timeAfter, date]);
    if (isLoading || !recipes) {
        return <CircularProgress />
    }
    return (
        <div>
            <div className={styles.recipes}>
                {typeof recipes.data != 'undefined' ? recipes.data.map((recipe) => (
                    <RecipeBlock key={recipe.id} recipe={recipe} />
                )) : ''}
            </div>
            <div className={styles.pager}>
                {recipes.count / 12 > 1 ? <Pagination count={Math.ceil(recipes.count / 12)} page={page + 1} onChange={(e, value) => setPage(value - 1)} /> : ''}
            </div>
        </div>
    );
};

export default RecipesData;