const server = require("./server");
const Game = require("./game");

const game = new Game(server.io);

server.io.on("connection", (socket) =>
{
    game.connect(socket);

    socket.on("disconnect", () =>
    {
        game.disconnect(socket);
    });
});

game.start();