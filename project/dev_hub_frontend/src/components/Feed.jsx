import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {

    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const result = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(result.data));
        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        getFeed();
    }, []);

    if (feed === null) {
        return <h1 className="text-center text-white">Loading...</h1>;
    }

    if (Array.isArray(feed) && feed.length === 0) {
        return <h1 className="text-bold text-center text-white text-3xl my-20">
            No Feed Items Found
        </h1>;
    }

    return (
        <div className="flex justify-center my-10">
            <UserCard user={feed[0]} />
        </div>
    );
}

export default Feed;