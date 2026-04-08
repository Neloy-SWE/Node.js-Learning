import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [isLoginForm, setIsLoginForm] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [error, setError] = useState("");


    const handleLogin = async () => {
        try {
            const result = await axios.post(
                BASE_URL + "/login",
                {
                    emailId,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(addUser(result.data));
            navigate("/feed");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
            console.log(err);
        }
    }

    const handleSignUp = async () => {
        try {
            const result = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                emailId,
                password,
            }, {
                withCredentials: true,
            });
            dispatch(addUser(result.data.data));
            navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }

    // const path = window.location.pathname;
    // console.log(path);
    const redirection = () => {
        if (user && isLoginForm) {
            navigate("/feed");
            // console.log("feed checked");
        }
    }

    useEffect(() => {
        redirection();
    }, [user]);

    return (
        <>

            <div className="flex justify-center my-10">
                <div className="card card-border bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center mb-5">{isLoginForm ? "Login" : "Sign Up"}</h2>

                        {!isLoginForm && (<div>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input w-full" placeholder="John"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input w-full" placeholder="Doe"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </div>
                        </div>)}

                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Email ID</legend>
                                <input
                                    type="text"
                                    value={emailId}
                                    className="input w-full" placeholder="example@gmail.com"
                                    onChange={(e) => setEmailId(e.target.value)}
                                />
                            </fieldset>
                        </div>

                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Password</legend>
                                <input
                                    type="password"
                                    value={password}
                                    className="input w-full" placeholder="*-*-*-*"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </fieldset>
                        </div>
                        <p className="text-error">{error}</p>
                        <div className="card-actions justify-center mt-5">
                            <button className="btn btn-primary btn-block" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
                        </div>

                        <p className="text-center mt-3 cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New user? Sign up here" : "Existing user? Login here"}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;