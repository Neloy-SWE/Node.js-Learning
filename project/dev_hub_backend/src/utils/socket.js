import { Server } from "socket.io";

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_BASE_URL,
            // methods: ["GET", "POST"],
            // credentials: true
        }
    });

    io.on("connection", (socket) => {
        socket.on("jointChat", () => {
            
        });

        socket.on("sendMessage", () => {

        });

        socket.on("disconnect", () => {

        });
    });
}

export { initializeSocket };