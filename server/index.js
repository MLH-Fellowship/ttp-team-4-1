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

    //Username emit
    socket.on('user name', (userMsg) => {
        server.io.emit('user name', userMsg);
    });
    
    //Message emit on chat
    socket.on('chat message', (chatMsg) => {
        server.io.emit('chat message', chatMsg);
    });

    //Mouse movement emit on canvas
    socket.on('mouse', (mouseMsg) => {
        io.socket.emit('mouse', mouseMsg);
        console.log(mouseMsg);
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