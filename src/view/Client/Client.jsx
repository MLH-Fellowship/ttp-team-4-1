import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Chat from "../Chat/Chat";
import Notepad from "../Notepad/Notepad";
import Music from "../Music/Music";
import share_my_code  from './share_my_code.png';
import "./Client.css"

const ENDPOINT = "localhost:3001";
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
                <div className="login">
                    <form onSubmit={onSubmit}>
                        Enter a Username:<br/>
                        <input type="text" name="input" placeholder="Username" />
                        <button class="btn waves-effect waves-light" type="submit" name="action">Enter the Chat
                        <i class="material-icons right">send</i>
                        </button>
                    </form>
                    <br/>
                    {errorMsg}
                </div>
                :
                <div className="main">
                   <div className="one"> <img className="logo" src={share_my_code} alt="Logo"/> </div>
                   <div className="two"> <Notepad socket={socket} /> </div>
                   <div className="three"> <Chat socket={socket} userName={userName} /> </div>
                   <div className="four">  <Music/> </div>
                </div>
            }
        </div>
    );
}