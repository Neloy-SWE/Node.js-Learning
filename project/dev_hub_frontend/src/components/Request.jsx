import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Request = () => {

    const requests = useSelector((state) => state.requests);
    const dispatch = useDispatch();

    const reviewReqest = async (status, requestId) => {
        try {
            const result = await axios.post(BASE_URL + `/request/review/${status}/${requestId}`, {}, { withCredentials: true });
            dispatch(removeRequests(requestId));
        } catch (err) {
            console.error("Error reviewing request:", err);
        }
    }

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

    // function checkOnload() {
    //     console.log("hi");
    // }

    // function checkOnloadWithParam(param) {
    //     console.log("hi", param);
    // }

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
                                {/* 
                                  * <button className="btn btn-success mx-2" onClick={checkOnload}>Accepted</button>
                                  * <button className="btn btn-success mx-2" onClick={checkOnload()}>Accepted</button>
                                  * <button className="btn btn-success mx-2" onClick={() => checkOnload()}>Accepted</button>
                                  * 
                                  * <button className="btn btn-error mx-2" onClick={checkOnloadWithParam("ok")}>Rejected</button>
                                  * <button className="btn btn-error mx-2" onClick={() => checkOnloadWithParam("ok")}>Rejected</button>
                                  *
                                  * here, we can see 2 kind of cases:
                                  * if we pass a function reference to onClick, it will be called only when the button is clicked. (checkOnload)
                                  * if we call the function directly in onClick (when we use the function name with parentheses), it will be called immediately when the component is rendered (checkOnload()) and will not work as expected when the button is clicked. especially, when we need to pass parameters we always need to use () parenthesis. but if we use () js will execute the function immediately.
                                  * so, to avoid this issue we can use an arrow function to call the function with parameters. this way, the function will be called only when the button is clicked. (() => checkOnloadWithParam("ok")) 
                                  * 
                                  * we can also use annonymous function like this:
                                  * <button className="btn btn-success mx-2" onClick={function () {checkOnload()}}>Accepted</button>
                                  */}

                                <button className="btn btn-success mx-2" onClick={() => reviewReqest("accepted", request._id)}>Accepted</button>
                                <button className="btn btn-error mx-2" onClick={() => reviewReqest("rejected", request._id)}>Rejected</button>
                            </div>

                        </div>
                    );


                })}

            </div>
        </>
    );
}

export default Request;