// Prevent use of undeclared variables
"use strict";

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
    this.io.emit("player join", `Socket ${socket.id} connected to server`);
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
    socket.emit("send private msg", chatMsg, sender, recipient);
    this.io.to(recipient).emit("send private msg", chatMsg, sender, recipient);
};

module.exports = Game;