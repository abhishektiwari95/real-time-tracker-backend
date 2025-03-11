const express = require('express');
const path = require("path");
const app = express();


// http server
const http = require("http");
 const server =http.createServer(app)

// socket io setup
const {Server} = require("socket.io");

const io = new Server(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
io.on("connection", function(socket){
    socket.on("send-location",function(data){
        io.emit("recive-location",{id:socket.id,...data});
    });
    console.log("connected");
    socket.on("disconnect", function() {
        io.emit("user-disconnected",socket.id);
    });
})
// testing routes
app.get("/" ,function (req,res) {
    res.render("index");
});

server.listen(3000);