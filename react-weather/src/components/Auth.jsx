import AuthForm from "./AuthForm";
import { useLocation } from "react-router";

export default function Auth() {
    const location = useLocation();
    const isLogin = location.state?.isLogin ?? true;
    
    return (
        <main>
            <AuthForm isLogin={isLogin} />
        </main>
    );
}