import React, { useEffect, useState } from "react";

export default function Notepad(props)
{
    const [text, setText] = useState("");
    
    const getTextArea = () =>
    {
        props.socket.emit("get textarea");

        props.socket.on("receive textarea", (text) =>
        {
            setText(text);
        });
    };

    const onChange = (event) =>
    {
        setText(event.target.value);
        props.socket.emit("update textarea", event.target.value);
    };

    useEffect(() =>
    {
        getTextArea();

        props.socket.on("textarea updated", (text) =>
        {
            setText(text);
        });
    }, []);

    return (
        <div>
            Notepad:<br/>
            <form>
                <textarea onChange={onChange} value={text} rows="40" cols="100" placeholder="Start typing here, for real-time peer programming" />
            </form>
        </div>
    );
}