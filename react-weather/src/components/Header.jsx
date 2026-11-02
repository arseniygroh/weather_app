import { useAuth } from "../context/AuthContext";
import {Link} from "react-router";

export default function Header() {
    const {isAuthenticated, logout, username} = useAuth();

    return (
        <header>
            <Link to="/">Weather Discovery</Link>
            <nav>
                <ul>
                    {isAuthenticated ? (
                        <>
                        <li>Hello {username}</li>
                        <li onClick={logout}>
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