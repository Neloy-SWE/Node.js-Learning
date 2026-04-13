import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router";

const Connections = () => {

    const connections = useSelector((state) => state.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {

            const result = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(result.data.data));
        } catch (err) {

        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0) return <h1 className="text-bold text-center text-white text-3xl my-20">No Connections Found</h1>


    return (
        <>
            <div className="text-center my-10">
                <h1 className="text-bold text-white text-3xl">Connections</h1>

                {connections.map((connection) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
                    return (
                        <div key={_id} className="lg:flex flex-column justify-between items-start bg-base-300 rounded-lg bg-base-300 w-2/3 mx-auto   px-16 py-4 lg:p-4 m-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
                                </div>
                                <div className="text-left mx-4">
                                    <h2 className="font-bold text-xl">{firstName} {lastName}</h2>
                                    {age && gender && <p>{age}, {gender}</p>}
                                    <p>{about}</p>
                                </div>
                                <div className="lg:mx-12 mx-0"></div>
                            </div>

                            <Link to={"/chat/" + _id}> <button className="btn btn-outline hover:bg-primary h-16 lg:w-32 w-full rounded-none hover:text-black lg:my-0 my-12">Chat</button></Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Connections;