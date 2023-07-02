import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";

const Register = () => {

    const { createUser } = UserAuth();
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);

    const handleRegister = () => {
        createUser(email, password);
    }

    return (
        <div>
            <div>
                <label>Email</label>
                <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type="text" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    )
}

export default Register;