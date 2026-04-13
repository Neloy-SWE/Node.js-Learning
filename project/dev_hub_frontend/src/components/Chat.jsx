import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
    const socketRef = useRef(null);

    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    // console.log(targetUserId);

    const user = useSelector((state) => state.user);
    const userId = user?._id;

    const sendMessage = () => {
        if (socketRef.current) {
            socketRef.current.emit("sendMessage",
                {
                    firstName: user.firstName,
                    userId,
                    targetUserId,
                    text: newMessage,
                }
            );

            setNewMessage("");
        }
    }


    useEffect(() => {
        if (!userId || !targetUserId) return;
        socketRef.current = createSocketConnection();
        const socket = socketRef.current;
        
        socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

        socket.on("messageReceived", ({ firstName, text, currentTime, id }) => {
            // console.log(firstName, text);
            setMessages((prevMessages) => [...prevMessages, { firstName, text, currentTime, id }]);
        });

        return () => {
            socket.off("messageReceived");
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5  border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {messages && messages.map((message, index) => {

                    return (
                        <div key={index}>
                            <div className={`chat ${message.id === userId ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-header">
                                    {message.id === userId ? "Me" : message.firstName}
                                    <time className="text-xs opacity-50">{message.currentTime}</time>
                                </div>
                                <div className="chat-bubble">{message.text}</div>
                            </div>
                        </div>

                    );
                })}
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-500 text-white rounded p-2"
                    type="text"
                />
                <button onClick={sendMessage} className="btn btn-secondary">Send</button>
            </div>

        </div>);
}

export default Chat;