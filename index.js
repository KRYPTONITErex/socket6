

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

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })

    socket.on("message",(data)=>{
        // console.log(data);
        io.emit("message",data);
    })

    socket.on("typing",(name)=>{
        socket.broadcast.emit("typing",name);
    })

})

