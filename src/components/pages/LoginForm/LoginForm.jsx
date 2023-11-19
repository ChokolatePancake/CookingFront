import React, {useState} from 'react';
import {useLoginUserMutation} from "../../../redux/api/cookingForumApi";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../../../redux/features/authSlice";
import {Link, Navigate} from "react-router-dom";
import 'filepond/dist/filepond.min.css';
import styles from "./LoginForm.module.scss";

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
                response.unwrap().then((data) => dispatch(loginSuccess(data.token))).catch((e) => setHasError(true));
            }
        }
    }
    if (isAuth) {
        return <Navigate to='/profile' />
    }
    return (
        <div className={styles.login}>
            <div>{hasError ? 'Incorrect password or email.' : ''}</div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                <div className={styles.item}>
                    <button type="submit">Log In</button>
                    <Link to={"/register"}>SingUp</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;