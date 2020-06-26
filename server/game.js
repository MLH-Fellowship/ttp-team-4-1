// Prevent use of undeclared variables
"use strict";

let players = [];
let oldText = "";

function Game(io)
{
    this.io = io;
}

Game.prototype.start = function start()
{
    console.log("Game has started!");
};

Game.prototype.connect = function connect(socket)
{
    // this.io.emit("player join", `Socket ${socket.id} connected to server`);

    socket.on("disconnect", () =>
    {
        this.io.emit("player leave", `Socket ${socket.id} disconnected from server`);
    });

    socket.on("set username", (userName) =>
    {
        if(!players.includes(userName) && (userName !== "" || userName !== " "))
        {
            socket.emit("user set", userName);

            socket.on("user set successful", () =>
            {
                players.push(userName);
                this.io.emit("player join", `Player ${userName} (${socket.id}) has joined the server`);
            });
        }
        else 
        {
            socket.emit("user exists", `${userName} is already taken or empty. Try another user name.`);
        
            socket.on("user set unsuccessful", () =>
            {
                console.log("User set unsuccessful");
            })
        }
    });

    // Listen for send message event
    socket.on("send message", (chatMsg, player, socketID) =>
    {
        // Emit a response to message sent event
        this.io.sockets.emit("message sent", chatMsg, player, socketID);
    });

    socket.on("send private msg", (chatMsg, senderName, recipient) =>
    {
        socket.emit("private msg sent", `Private message to ${recipient.name}`);
        this.io.to(recipient.id).emit("private msg sent", `Private message from ${senderName}`);
    });

    socket.on("update textarea", (text) =>
    {
        oldText = text;
        socket.broadcast.emit("textarea updated", text);
    });

    socket.on("get textarea", () =>
    {
        socket.emit("receive textarea", oldText);
    });
};

module.exports = Game;