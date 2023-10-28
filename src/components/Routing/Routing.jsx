import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import RegisterForm from "../pages/RegisterForm/RegisterForm";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<RegisterForm/>} />
        </Routes>
    );
};

export default Routing;