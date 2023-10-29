import React, {useState} from 'react';
import {useRegisterUserMutation} from "../../../redux/api/cookingForumApi";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [registerUser, {isLoading, error}] = useRegisterUserMutation();
    const handleRegister = (e) => {
        e.preventDefault();
        const response = registerUser({
            email,
            nickName,
            password
        });
        if (!isLoading) {
            console.log(response);
        }
    }
    return (
        <div>
            <h1>Register</h1>
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