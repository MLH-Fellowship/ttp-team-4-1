import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "localhost:3001";

export default function Client()
{
    const [response, setResponse] = useState("");

    useEffect(() =>
    {
        const socket = socketIOClient(ENDPOINT);
        socket.on("GetSocketID", data =>
        {
            setResponse(data);
        });

        // Clean up the effect
        return () => socket.disconnect();
    }, []);

    return (
        <p>
            Socket with id {response} connected.
        </p>
    );
}