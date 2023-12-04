import React, {useEffect, useState} from 'react';
import {useGetRecipesMutation, useGetRecipesQuery} from "../../../redux/api/cookingForumApi";
import {Checkbox, CircularProgress, FormControlLabel, FormGroup, Pagination, Slider} from "@mui/material";
import RecipeBlock from "../../RecipeBlock/RecipeBlock";
import {recipeCategories} from "../../../features/categories";
import {current} from "@reduxjs/toolkit";
import RecipesData from "./RecipesData/RecipesData";

const Recipes = () => {
    const [date, setDate] = useState(true);
    const [categories, setCategories] = useState([]);
    const [timeBefore, setTimeBefore] = useState(0);
    const [timeAfter, setTimeAfter] = useState();
    const changeCetegories = (e) => {
        if (e.target.checked) {
            setCategories(current => [e.target.labels[0].textContent, ...current])
        }
        else {
            setCategories(current => current.filter((c) => c != e.target.labels[0].textContent))
        }
    }
    const changeTime = (e, value) => {
        setTimeBefore(value[0]);
        setTimeAfter(value[value.length - 1]);
    }
    return (
        <div>
            <div>
                <FormGroup>
                    <h4>Categories</h4>
                    {recipeCategories.map((category) => (
                        <FormControlLabel key={category} control={<Checkbox checked={categories.includes(category)} onChange={changeCetegories} />} label={category} />
                    ))}
                    <h4>Cooking time</h4>
                    <Slider
                        getAriaLabel={() => 'Time range'}
                        value={[timeBefore, timeAfter ? timeAfter : 1440]}
                        onChange={changeTime}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                        min={0}
                        step={5}
                        max={1440}
                    />
                </FormGroup>
            </div>
            <div onClick={() => setDate(current => !current)}>
                {!date ? <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z"/></svg>}
            </div>
            <RecipesData categories={categories} date={date} timeAfter={timeAfter} timeBefore={timeBefore} />
        </div>
    );
};

export default Recipes;