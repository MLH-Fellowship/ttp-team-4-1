const express = require("express");
const HTTP = require("http");
const socketIO = require("socket.io");

const app = express();

app.use((req, res, next) =>
{
    res.header("Access-Control-Allow-Origin", process.env.REACT_APP_HOST || "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    return next();
});

app.use(express.static(__dirname + "/../build"));

const http = HTTP.Server(app);
const io = socketIO(http);

const port = process.env.PORT || 3001;

//Socket io for user connection
io.on('connection', (socket) => {
    console.log('oi we got a new user here');

    //Socket io for user messages
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });

//Socket io for user disconnection
    socket.on('disconnect', () =>{
        console.log('oi, new user is gone');
    });
});

app.get('/', function (req, res) {
    res.render('index', {});
})

http.listen(port, () =>
{
    console.log("Listening on port ", port);
});

module.exports =
{
    app, http, io
};