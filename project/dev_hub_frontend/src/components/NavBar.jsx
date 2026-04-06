import { useSelector } from "react-redux";
import { Link } from "react-router";

const NavBar = () => {

    const user = useSelector((state) => state.user);

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
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default NavBar;