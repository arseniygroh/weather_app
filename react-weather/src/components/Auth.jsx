import AuthForm from "./AuthForm";

export default function Auth() {
    return (
        <>
            <h1>This is Auth</h1>
            <AuthForm isLogin={false}/>
        </>
    )
}