import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uesrData = useSelector((state) => state.user);

    const fetchUser = async () => {
        try {
            const user = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });

            dispatch(addUser(user.data));
        } catch (err) {
            if (err.response.status === 401) {
                
                // both return same:
                // console.log(err.response.status);
                // console.log(err.status);

                navigate("/login");
            }

            console.log(err);
        }
    };

    useEffect(() => {
        if (!uesrData) {
            fetchUser();
        }
    }, []);

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Body;