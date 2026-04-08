import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Request = () => {

    const requests = useSelector((state) => state.requests);
    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try {
            const result = await axios.get(BASE_URL + "/user/pending-requests", {
                withCredentials: true,
            });

            dispatch(addRequests(result.data.data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length === 0) return <h1 className="text-bold text-center text-white text-3xl my-20">No Requests Found</h1>


    return (
        <>
            <div className="text-center my-10">
                <h1 className="text-bold text-white text-3xl">Requests</h1>

                {requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
                    return (
                        <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
                            <div className="flex-shrink-0">
                                <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">{firstName} {lastName}</h2>
                                {age && gender && <p>{age}, {gender}</p>}
                                <p>{about}</p>
                            </div>

                            <div>
                                <button className="btn btn-success mx-2">Interested</button>
                                <button className="btn btn-error mx-2">Rejected</button>
                            </div>

                        </div>
                    );


                })}

            </div>
        </>
    );
}

export default Request;