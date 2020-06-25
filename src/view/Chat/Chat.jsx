import React, { useEffect, useState } from "react";

export default function Chat(props)
{
    const [chatMsg, setChatMsg] = useState("");
    const [messages, setMessages] = useState([]);

    const onSubmit = (event) =>
    {
        event.preventDefault();
        event.target.reset();
        // Emit to send message event
        props.socket.emit("send message", chatMsg, props.userName, props.socket.id);
    };

    const onChange = (event) =>
    {
        setChatMsg(event.target.value);
    };

    const onClick = (event, recipient) =>
    {
        event.preventDefault();
        props.socket.emit("send private msg", "", props.userName, recipient);
    };

    useEffect(() =>
    {
        // Listen for response from message sent event
        props.socket.on("message sent", (chatMsg, player, socketID) =>
        {
            setMessages(prevMessages => [...prevMessages, { player: { name: player, id: socketID }, chatMsg }]);
        });

        props.socket.on("private msg sent", (chatMsg) =>
        {
            setMessages(prevMessages => [...prevMessages, { player: { name: "CONSOLE", id: "0"}, chatMsg }])
        });

        props.socket.on("player join", (msg) =>
        {
            setMessages(prevMessages => [...prevMessages, { player: { name: "CONSOLE", id: "0"}, chatMsg: msg }]);
        });

        props.socket.on("player leave", (msg) =>
        {
            setMessages(prevMessages => [...prevMessages, { player: { name: "CONSOLE", id: "0"}, chatMsg: msg }]);
        });

        // Clean up the effect
        return () => props.socket.disconnect();
    }, []);

    return (
        <div>
            Welcome, <strong>{props.userName}</strong>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Chat Here" onChange={onChange} />
            </form>
            Messages:<br/>
            {messages.map(msg => 
                <div>
                    {msg.player.name !== props.userName ? 
                        <a href={msg.player.name} onClick={event => onClick(event, msg.player)}><strong>{msg.player.name}</strong></a> : 
                        <strong>{msg.player.name}</strong>
                    }  
                    <br/>
                    {msg.chatMsg}
                </div>
            )}
        </div>
    );
}