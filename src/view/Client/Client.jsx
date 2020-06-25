import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Chat from "../Chat/Chat";

const ENDPOINT = "localhost:3001";

export default function Client()
{
    const socket = socketIOClient(ENDPOINT);

    useEffect(() =>
    {
        // Clean up the effect
        return () => socket.disconnect();
    }, []);

    return (
        <p>
            <Chat socket={socket} />
        </p>
    );
}