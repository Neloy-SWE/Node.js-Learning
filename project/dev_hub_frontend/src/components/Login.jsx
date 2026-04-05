import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("jobbar@gmail.com");
    const [password, setPassword] = useState("#Jobbar12#");
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            console.log(err);
        }
    }

    return (
        <>
            <div className="flex justify-center my-10">
                <div className="card card-border bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center mb-5">Login</h2>
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
                        <div className="card-actions justify-center mt-5">
                            <button className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;