import { configureStore } from '@reduxjs/toolkit';
import {cookingForumApi} from "./api/cookingForumApi";
import authReducer from  './features/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [cookingForumApi.reducerPath]: cookingForumApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cookingForumApi.middleware),
})
export default store;