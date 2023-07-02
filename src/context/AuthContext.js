import { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as signOUtFirebase } from "firebase/auth"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const UserContext =  createContext();

export const AuthContextProvider = ({children}) => {

    const [ currentUser,setCurrentUser ] = useState({});

    const navigate = useNavigate();

    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((resp) => {
                setCurrentUser(resp.user);
                navigate('/lessons');
            })  
            .catch((error) => {
                alert(error.message)
            })
    }

    const signIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((resp)=>{
                setCurrentUser(resp.user);
                navigate('/lessons');
            })
            .catch((error)=>{
                alert(error.message)
            })
    }

    const signOut = (e) => {
        if(currentUser && Object.keys(currentUser).length){
            signOUtFirebase(auth)
                        .then((resp)=>{
                            setCurrentUser({});
                            navigate('/login');
                        })
                        .catch((e)=>{
                            console.log(e);
                        })
        }
    }

    return (
        <UserContext.Provider value={{createUser, signIn, signOut, currentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}



