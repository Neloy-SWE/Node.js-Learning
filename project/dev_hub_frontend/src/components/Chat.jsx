import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([{ text: "Hello, how are you?" }]);
    // console.log(targetUserId);

    const user = useSelector((state) => state.user);
    const userId = user?._id;


    useEffect(() => {
        const socket = createSocketConnection();
        socket.emit("joinChat", { userId, targetUserId });

    }, []);

    return (
        <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5  border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {messages && messages.map((message, index) => {
                    // return (
                    //     <div key={index} className={"my-2 p-2 rounded " + (message.isSentByCurrentUser ? "bg-primary text-white self-end" : "bg-gray-300 self-start")}>
                    //         {message.text}
                    //     </div>
                    // );

                    return (
                        <div key={index}>
                            <div className="chat chat-start">
                                {/* <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                                        />
                                    </div>
                                </div> */}
                                <div className="chat-header">
                                    Obi-Wan Kenobi
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble">You were the Chosen One!</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                        </div>

                    );
                })}
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input className="flex-1 border border-gray-500 text-white rounded p-2" type="text" />
                <button className="btn btn-secondary">Send</button>
            </div>

        </div>);
}

export default Chat;