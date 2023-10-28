import React from 'react';

const RegisterForm = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Hello Wo")
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="email" placeholder="Email"/>
                <input type="text" placeholder="Nick Name"/>
                <input type="password" placeholder="Password"/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default RegisterForm;