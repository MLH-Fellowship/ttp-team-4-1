import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Chat from "../Chat/Chat";
import Notepad from "../Notepad/Notepad";
import Music from "../Music/Music";

let ENDPOINT;

if(process.env.NODE_ENV === "development") ENDPOINT = "localhost:3001";
else if(process.env.NODE_ENV === "production") ENDPOINT = `https://sharemycode.herokuapp.com:${process.env.PORT}`;


const connectionOptions =
{
    "force new connection": true,
    "reconnectionAttempts": "infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};

export default function Client()
{
    const socket = socketIOClient(ENDPOINT, connectionOptions);
    const [userName, setUsername] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = (event) =>
    {
        event.preventDefault();
        socket.emit("set username", event.target.input.value);
        event.target.reset();
    };

    useEffect(() =>
    {
        socket.on("user set", (userName) =>
        {
            setUsername(userName);
            setLoggedIn(true);
            socket.emit("user set successful");
        });

        socket.on("user exists", (errorMsg) =>
        {
            setErrorMsg(errorMsg);
            setLoggedIn(false);
            setTimeout(() => setErrorMsg(""), 2000);

            socket.emit("user set unsuccessful");
        });

        // Clean up the effect
        return () => socket.disconnect();
    }, []);

    return (
        <div>
            {!isLoggedIn ? 
                <div>
                    <form onSubmit={onSubmit}>
                        Enter a Username:<br/>
                        <input type="text" name="input" placeholder="Username" />
                        <button type="submit">Enter the Chat</button>
                    </form>
                    <br/>
                    {errorMsg}
                </div>
                :
                <div>
                    <Notepad socket={socket} />
                    <Chat socket={socket} userName={userName} />
                    <Music/>
                </div>
            }
        </div>
    );
}