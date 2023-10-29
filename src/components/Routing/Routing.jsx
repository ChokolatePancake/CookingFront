import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import RegisterForm from "../pages/RegisterForm/RegisterForm";
import LoginForm from "../pages/LoginForm/LoginForm";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRouting/PrivateRoute";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/profile" element={
                <PrivateRoute>
                    <Profile/>
                </PrivateRoute>
            }/>
        </Routes>
    );
};

export default Routing;