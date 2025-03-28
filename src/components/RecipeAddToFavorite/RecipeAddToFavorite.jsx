import React from 'react';
// import {useAddToFavoriteMutation, useIsFavoriteQuery, useRemoveFavoriteMutation} from "../../redux/api/cookingForumApi";
import { useIsFavoriteQuery, useChangeFavoriteMutation} from "../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const RecipeAddToFavorite = ({recipeId}) => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const isFavoriteRecipe = useIsFavoriteQuery(recipeId);
    const [changeFavorite, changeFavoriteData] = useChangeFavoriteMutation();
    // const [addToFavorite, changeFavoriteData] = useAddToFavoriteMutation();
    // const [removeFavorite, removeFavoriteData] = useRemoveFavoriteMutation();
    const navigate = useNavigate();
    if (isFavoriteRecipe.isLoading) {
        return <CircularProgress />
    }
    let fill = isFavoriteRecipe.data ? "#F6784C" : "transparent";
    const handleAddToFavorite = (e) => {
        if (!isAuth) {
            navigate('/login')
        }
        // if (isFavoriteRecipe.data) {
        //     removeFavorite(recipeId);
        // }
        // else {
        //     addToFavorite(recipeId);
        // }
        changeFavorite(recipeId);
    }
    return (
        <div onClick={handleAddToFavorite}>
            <svg width='30px' height='25px' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="-13 0 192.88 85.39"><title>red-heart</title><path stroke='#252525' strokeWidth="10px" fill={fill} fillRule={'evenodd'} className="cls-1" d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"/></svg>
        </div>
    );
};

export default RecipeAddToFavorite;