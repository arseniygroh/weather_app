import { useAuth } from "../context/AuthContext";
import {Link} from "react-router";

export default function Header() {
    const {isAuthenticated, logout, username} = useAuth();

    return (
        <header className="app-header">
            <Link to="/" className="logo">Weather Discovery</Link>
            <nav>
                <ul className="nav-links">
                    {isAuthenticated ? (
                        <>
                        <li className="greeting">Hello, {username}</li>
                        <li onClick={logout} className="logout-btn">
                            Log out
                        </li>
                        </>
                    ) : (
                        <>
                        <li>
                            <Link to="/auth" state={{isLogin: false}}>Register</Link>
                        </li>
                        <li>
                            <Link to="/auth" state={{isLogin: true}}>Log in</Link>
                        </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}