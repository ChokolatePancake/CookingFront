import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import RegisterForm from "../pages/RegisterForm/RegisterForm";
import LoginForm from "../pages/LoginForm/LoginForm";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRouting/PrivateRoute";
import EditProfile from "../pages/Profile/EditProfile/EditProfile";
import AddRecipeForm from "../pages/AddRecipeForm/AddRecipeForm";
import Recipe from "../pages/Recipe/Recipe";
import Recipes from "../pages/Recipes/Recipes";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/explore" element={<Recipes />} />
            <Route path="/profile" element={
                <PrivateRoute>
                    <Profile/>
                </PrivateRoute>
            }/>
            <Route path="/profile/edit" element={
                <PrivateRoute>
                    <EditProfile/>
                </PrivateRoute>
            }/>
            <Route path="/recipe/add" element={
                <PrivateRoute>
                    <AddRecipeForm/>
                </PrivateRoute>
            }/>
            <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
    );
};

export default Routing;