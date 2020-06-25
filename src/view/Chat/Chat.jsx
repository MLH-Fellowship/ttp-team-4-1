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

    const onClick = (event, id) =>
    {
        event.preventDefault();
        props.socket.emit("send private msg", "Private Message", props.socket.id, id);
    };

    useEffect(() =>
    {
        props.socket.on("send message", (chatMsg, player) =>
        {
            setMessages(prevMessages => [...prevMessages, { player, chatMsg }]);
        });

        props.socket.on("send private msg", (chatMsg, sender, recipient) =>
        {
            setMessages(prevMessages => [...prevMessages, { player: recipient, chatMsg }])
        });

        props.socket.on("player join", (msg) =>
        {
            setMessages(prevMessages => [...prevMessages, { player: "CONSOLE", chatMsg: msg }]);
        });

        props.socket.on("player leave", (msg) =>
        {
            setMessages(prevMessages => [...prevMessages, { player: "CONSOLE", chatMsg: msg }]);
        });
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Chat Here" onChange={onChange} />
            </form>
            Messages:<br/>
            {messages.map(msg => 
                <div>
                    <a href={msg.player} onClick={event => onClick(event, msg.player)}>{msg.player}</a>: {msg.chatMsg}
                </div>
            )}
        </div>
    );
}