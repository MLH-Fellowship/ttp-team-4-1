import React, { useEffect, useState } from "react";

export default function Chat(props)
{
    const [chatMsg, setChatMsg] = useState("");
    const [messages, setMessages] = useState([]);

    const onSubmit = (event) =>
    {
        event.preventDefault();
        event.target.reset();
        props.socket.emit("send message", chatMsg, props.userName);
    };

    const onChange = (event) =>
    {
        setChatMsg(event.target.value);
    };

    const onClick = (event, id) =>
    {
        event.preventDefault();
        props.socket.emit("send private msg", "", props.userName, id);
    };

    useEffect(() =>
    {
        props.socket.on("send message", (chatMsg, player) =>
        {
            setMessages(prevMessages => [...prevMessages, { player, chatMsg }]);
        });

        props.socket.on("send private msg", (chatMsg, sender, recipient) =>
        {
            setMessages(prevMessages => [...prevMessages, { player: "CONSOLE", chatMsg }])
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
            Welcome, <strong>{props.userName}</strong>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Chat Here" onChange={onChange} />
            </form>
            Messages:<br/>
            {messages.map(msg => 
                <div>
                    {msg.player !== props.userName ? 
                        <a href={msg.player} onClick={event => onClick(event, msg.player)}><strong>{msg.player}</strong></a> : 
                        <strong>{msg.player}</strong>
                    }  
                    <br/>
                    {msg.chatMsg}
                </div>
            )}
        </div>
    );
}