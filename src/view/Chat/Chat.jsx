import React, { useEffect, useState } from "react";

export default function Chat(props)
{
    const [chatMsg, setChatMsg] = useState("");
    const [messages, setMessages] = useState([]);

    const onSubmit = (event) =>
    {
        event.preventDefault();
        event.target.reset();
        props.socket.emit("send message", chatMsg, props.socket.id);
    };

    const onChange = (event) =>
    {
        setChatMsg(event.target.value);
    };

    useEffect(() =>
    {
        props.socket.on("send message", (chatMsg, player) =>
        {
            setMessages(prevMessages => [...prevMessages, `${player}: ${chatMsg}`]);
        });

        props.socket.on("player join", (msg) =>
        {
            setMessages(prevMessages => [...prevMessages, msg]);
        });

        props.socket.on("player leave", (msg) =>
        {
            setMessages(prevMessages => [...prevMessages, msg]);
        });
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Chat Here" onChange={onChange} />
            </form>
            Messages:<br/>
            {messages.map(msg => <div>{msg}</div>)}
        </div>
    );
}