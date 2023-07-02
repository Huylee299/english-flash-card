import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Login = () => {

    const [ email,setEmail ] = useState("");
    const [ password,setPassword ] = useState("");

    const { createUser, signIn, signOutEE, currentUser } = UserAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(email, password);
    };

    const handleSignIn = (e) => {
        signIn(email, password);
    }

    const handleSignOut = (e) => {
        signOutEE();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>username</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text"/>
                </div>
                <div>
                    <label>password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="text"/>
                </div>
                <button type="submit">Submit</button>
            </form>

            <div>
                <button onClick={handleSignIn}>Sign In</button>
            </div>

            <div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </>
    )
}

export default Login;