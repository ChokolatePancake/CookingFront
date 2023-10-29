import React, {useState} from 'react';
import {useLoginUserMutation} from "../../../redux/api/cookingForumApi";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../../../redux/features/authSlice";
import {Navigate} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [userLogin, {isLoading, error}] = useLoginUserMutation();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const handleLogin = (e) => {
        e.preventDefault();
        const response = userLogin({
            email,
            password
        });
        if (!isLoading) {
            if (error) {
                setHasError(true);
            }
            else {
                response.unwrap().then((data) => dispatch(loginSuccess(data.token)));
            }
        }
    }
    if (isAuth) {
        return <Navigate to='/profile' />
    }
    return (
        <div>
            <div>{hasError ? 'Incorrect password or email.' : ''}</div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginForm;