// Prevent use of undeclared variables
"use strict";

let players = [];

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

    socket.on("set username", (userName) =>
    {
        if(!players.includes(userName) && (userName !== "" || userName !== " "))
        {
            players.push(userName);
            socket.emit("user set", userName);
            this.io.emit("player join", `Player ${userName} (${socket.id}) has joined the server`);
        }
        else socket.emit("user exists", `${userName} is already taken or empty. Try another user name.`);
    });
};

Game.prototype.disconnect = function disconnect(socket)
{
    this.io.emit("player leave", `Socket ${socket.id} disconnected from server`);
};

Game.prototype.sendMessage = function sendMessage(socket, chatMsg, player)
{
    this.io.emit("send message", chatMsg, player);
};

Game.prototype.sendPrivateMsg = function sendPrivateMsg(socket, chatMsg, sender, recipient)
{
    socket.emit("send private msg", `Private message to ${recipient}`, sender, recipient);
    this.io.to(recipient).emit("send private msg", `Private message from ${sender}`, sender, recipient);
};

module.exports = Game;