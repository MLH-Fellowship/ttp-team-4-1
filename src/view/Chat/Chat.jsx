import React, { useEffect, useState } from "react";

export default function Chat(props)
{
    const [chatMsg, setChatMsg] = useState("");
    const [messages, setMessages] = useState([]);

    const onSubmit = (event) =>
    {
        event.preventDefault();
        event.target.reset();
        props.socket.emit("send message", chatMsg);
        console.log(chatMsg);
    };

    const onChange = (event) =>
    {
        setChatMsg(event.target.value);
    };

    useEffect(() =>
    {
        props.socket.on("send message", chatMsg =>
        {
            setMessages(prevMessages => [...prevMessages, chatMsg]);
        });
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Chat Here" onChange={onChange} />
                <br/>
                {chatMsg}
            </form>
            Messages:<br/>
            {messages.map(msg => <div>{msg}</div>)}
        </div>
    );
}