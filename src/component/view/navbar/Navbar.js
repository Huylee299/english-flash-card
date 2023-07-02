import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import "./Navbar.css"

const Navbar = () => {

    const { signOut } = UserAuth();
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    }

    return (
        <div className="navbar-container">
            <button onClick={signOut}>
                Sign out
            </button>
            <button onClick={handleReturn}>
                Return
            </button>
        </div>
    )
}

export default Navbar;