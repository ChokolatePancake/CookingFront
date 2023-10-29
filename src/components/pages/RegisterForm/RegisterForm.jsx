import React, {useState} from 'react';
import {useRegisterUserMutation} from "../../../redux/api/cookingForumApi";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../../../redux/features/authSlice";
import {Navigate} from "react-router-dom";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [hasError, setHasError] = useState(false);
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [registerUser, {isLoading, error}] = useRegisterUserMutation();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const handleRegister = (e) => {
        e.preventDefault();
        const response = registerUser({
            email,
            nickName,
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
            <h1>Register</h1>
            <div>{hasError ? 'User exist with this nickname or email.' : ''}</div>
            <form onSubmit={handleRegister}>
                <input required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input required type="text" placeholder="Nick Name" onChange={(e) => setNickName(e.target.value)}/>
                <input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default RegisterForm;