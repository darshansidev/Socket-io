require('dotenv').config();
// ----------import packages--------------
const express = require('express');
const cors = require('cors');
const socket = require("socket.io");


// -------------package init in variable --------
const app = express();
const PORT = process.env.PORT;


// -----------External Routes ----------------
const databaseConnection = require('./src/database/db-config');
const authRoutes = require("./src/routes/user.route");
const messageRoutes = require("./src/routes/message.route");


// ------------------middlewares----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// ----------------server create and database connection--------------------
const server = app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`⚡ App listening on the port ${PORT} Link : http://localhost:${PORT}⚡`);
    databaseConnection();
    console.log(`=================================`);
    console.log(`Database on Running`);
    console.log(`=================================`);
})



// -----------------socket io setup------------------

const io = socket(server, {
    cors: {
        origin: `http://localhost:${PORT}`,
        credentials: true,
    },
});

global.onlineUsers = new Map();




//--------------- scoket io emit here --------------

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});






// ------------------initial route -------------------
app.get('/', (req, res) => {
    return res.json({ msg: "Ping Successful" });
})


// ----------------use Route here---------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
