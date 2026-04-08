import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(
                BASE_URL + "/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            dispatch(removeUser());
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="navbar bg-base-200 shadow-sm">
            <div className="flex-1">
                <Link to="/feed" className="btn btn-ghost text-xl">😂 DevHub !!</Link>
            </div>
            {user && (
                <div className="flex items-center">
                    <p className="px-4">Welcome, {user.firstName} {user.lastName} !</p>
                    <div className="flex gap-2">
                        <div className="dropdown dropdown-end mx-5">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="profile picture"
                                        src={user.photoUrl} />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                    </Link>
                                </li>
                                <li><Link to="/connections">Connections</Link></li>
                                <li><a onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default NavBar;