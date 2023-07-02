import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import "./style.css"
const Login = () => {


    const { signIn,createUser } = UserAuth();

    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);

    const handleSignIn = (e) => {
        e.preventDefault();
        signIn(email, password);
    }

    const handleSignUp = (e) => { 
        e.preventDefault();
        createUser(email, password);
    }


    return (
        <>
             <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h3>Login Here</h3>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Email" id="username" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button onClick={(e) => handleSignIn(e)}>Sign In</button>
                <button onClick={(e) => handleSignUp(e)}>Sign Up</button>
            </form>
        </>
       
    )
}

export default Login;