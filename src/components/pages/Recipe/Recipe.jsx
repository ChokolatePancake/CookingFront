import React from 'react';
import {useParams} from "react-router-dom";
import {useRecipeQuery} from "../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";

const Recipe = () => {
    let {id} = useParams();
    const {data, isLoading, error} = useRecipeQuery(id);
    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <div>
            <h1>{data.name}</h1>
            {data.picture ? <img src={'http://localhost:8080/' + data.picture} alt=""/> : ''}
            <div>Time: {data.time}</div>
            <div>Ingredients: {data.ingredients}</div>
            <div>Date: {data.date}</div>
            <div>Author: {data.authorNickname}</div>
            {
                data.steps.map(step =>
                    <div>
                        <div>{step.number}</div>
                        {step.picture ? <img src={'http://localhost:8080/' + step.picture} alt=""/> : ''}
                        <p>{step.text}</p>
                    </div>
                )
            }
        </div>
    );
};

export default Recipe;