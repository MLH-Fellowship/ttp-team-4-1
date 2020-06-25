const server = require("./server");
const Game = require("./game");

const game = new Game(server.io);

let interval;

server.io.on("connection", (socket) =>
{
    console.log("New client connected");

    if(interval) clearInterval(interval);
    interval = setInterval(() => getSocketAndEmit(socket), 1000);

    game.connect(socket);

    socket.on('chat message', (chatMsg) => {
        io.emit('chat message', chatMsg);
    });

    socket.on("disconnect", () =>
    {
        console.log("Client disconnected");
        clearInterval(interval);
        game.disconnect(socket);
    });
});

const getSocketAndEmit = (socket) =>
{
    const response = socket.id;

    // Emitting a new message, will be received by client
    socket.emit("GetSocketID", response);
};

game.start();