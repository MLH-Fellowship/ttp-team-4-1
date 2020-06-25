import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Chat from "../Chat/Chat";

const ENDPOINT = "localhost:3001";

export default function Client()
{
    const socket = socketIOClient(ENDPOINT);
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
            console.log(`${isLoggedIn} from user set`);
        });

        socket.on("user exists", (errorMsg) =>
        {
            setErrorMsg(errorMsg);
            setLoggedIn(false);
            console.log(`${isLoggedIn} from user exists`);
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
                <Chat socket={socket} userName={userName} />
            }
        </div>
    );
}