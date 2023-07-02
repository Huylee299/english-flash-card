import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../component/view/navbar/Navbar";

const PrivateRoute = () => {
    
    const { currentUser } = UserAuth();


    return (
        currentUser && Object.keys(currentUser).length  ?  <> <Navbar/> <Outlet/> </>: <Navigate to="/login"/>
    )
}

export default PrivateRoute;