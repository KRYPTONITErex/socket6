

let socket = require("socket.io");
let express = require("express");

//app set up
let app = express();

//server setup
let server = app.listen(8888,()=>{
    console.log("server is running on port 8888");
})

//static files
app.use(express.static("public"));

//socket setup
let io = socket(server);


io.on("connection",(socket)=>{
    console.log("a user connected " + socket.id);

    socket.on("joinRoom",(roomName, username)=>{
        socket.join(roomName);
        console.log(username + " joined the room " + roomName);
        socket.emit("message",{
            username:"Server",
            message: `You have joined the room ${roomName}`,
        })
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })

    socket.on("message",(data)=>{
        // console.log(data);
        // io.emit("message",data);
        io.to(data.room).emit("message",data); // send message to room
    })

    socket.on("typing",(name)=>{
        socket.broadcast.emit("typing",name);
    })

})

