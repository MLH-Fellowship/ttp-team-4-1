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