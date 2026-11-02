import { createContext, useContext, useState, useEffect } from "react";
import {getCookie, setCookie} from "./cookies";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const cookie = getCookie("currentUser");
        if (cookie) {
            try {
                const userData = JSON.parse(cookie);
                setUsername(userData.username);
            } catch (e) {
            }
        }
    }, []);

    function register(newUsername, password) {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        
        if (storedUsers.some(u => u.username === newUsername)) return "This username is already taken";        
        storedUsers.push({username: newUsername, password});
        localStorage.setItem("users", JSON.stringify(storedUsers));
        
        setCookie("currentUser", JSON.stringify({username: newUsername}), 1);
        setUsername(newUsername);
        return null;
    }

    

    return (
        <AuthContext.Provider value={{ 
            username, 
            isAuthenticated: Boolean(username), 
            login, 
            register, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);