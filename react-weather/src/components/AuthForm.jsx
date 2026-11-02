import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router"

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export default function AuthForm({ isLogin }) {
    const [errors, setErrors] = useState([]);
    const {login, register} = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]); 

        const formData = new FormData(e.target);
        const {confirmPassword, password, username} = Object.fromEntries(formData);
        let currentErrors = [];

        if (!username.trim()) {
            currentErrors.push("You must provide a username");
        }
        if (!passwordPattern.test(password)) {
            currentErrors.push("You must provide a password and must contain a digit and be at least 8 symbols long");
        }
        if (!isLogin && password !== confirmPassword) {
            currentErrors.push("Your passwords must match");
        }
        
        if (currentErrors.length > 0) {
            setErrors(currentErrors);
            return;
        }

        const authError = isLogin ? login(username, password) : register(username, password);

        if (authError) {
            setErrors([authError]);
        } else {
            alert(isLogin ? "Logged in successfully!" : "Registered successfully!");
            navigate("/");
        }
    }

    return (
        <div>
            <header>
                <h3>{isLogin ? "Welcome back!" : "Welcome guest!"}</h3>
                <p>Fill in the form below with your credentials</p>
            </header>
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" required name="password" id="password" />
                </div>
                {!isLogin && (
                    <div>
                        <label htmlFor="confirmPassword">Confirm your password</label>
                        <input type="password" required name="confirmPassword" id="confirmPassword" />
                    </div>
                )}
                <button type="submit">{!isLogin ? "Register" : "Log in"}</button>
            </form>
            {errors && errors.length > 0 && (
                <ul>
                    {errors.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}