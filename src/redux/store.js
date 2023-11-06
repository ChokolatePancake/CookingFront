import { configureStore } from '@reduxjs/toolkit';
import {cookingForumApi} from "./api/cookingForumApi";
import authReducer from  './features/authSlice';
import addRecipeReducer from './features/addRecipeSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        addRecipe: addRecipeReducer,
        [cookingForumApi.reducerPath]: cookingForumApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cookingForumApi.middleware),
})
export default store;