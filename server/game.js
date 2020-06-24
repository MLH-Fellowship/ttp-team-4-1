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
    console.log(`Socket ${socket.id} connected to server`);
};

Game.prototype.disconnect = function disconnect(socket)
{
    console.log(`Socket ${socket.id} disconnected from server`);
};

module.exports = Game;