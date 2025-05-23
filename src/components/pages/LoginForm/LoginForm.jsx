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
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        general: false
    });
    const [userLogin, {isLoading, error}] = useLoginUserMutation();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({ email: false, password: false, general: false });

        try {
            const response = await userLogin({ email, password });
            if ('error' in response) {
                const errorData = response.error;
                if (errorData.status === "PARSING_ERROR") {
                    setErrors(prev => ({ ...prev, email: true }));
                } else if (errorData.status === 403) {
                    setErrors(prev => ({ ...prev, password: true }));
                } else if (errorData.status === 404) {
                    setErrors(prev => ({ ...prev, email: true }));
                }
            } else {
                dispatch(loginSuccess(response.data.token));
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, general: true }));
        }
    }

    if (isAuth) {
        return <Navigate to='/profile' />
    }

    return (
        <div className={styles.login}>
            {(errors.email || errors.password || errors.general) && (
                <div className={styles.error_message}>
                    {errors.email && 'Incorrect email.'}
                    {errors.password && 'Incorrect password.'}
                    {errors.general && 'Incorrect password or email.'}
                </div>
            )}
            <h1>Login</h1>
            <form onSubmit={handleLogin} className={styles.form}>
                <input 
                    className={`${styles.input} ${errors.email || errors.general ? styles.error : ''}`} 
                    type="email" 
                    placeholder="Email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className={`${styles.input} ${errors.password || errors.general ? styles.error : ''}`} 
                    type="password" 
                    placeholder="Password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.item}>
                    <button type="submit" className={styles.button}>Log In</button>
                    <div className={styles.signup}>Haven't account? <Link to={"/register"}>SignUp</Link></div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;