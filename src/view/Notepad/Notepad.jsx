import React, { useEffect, useState } from "react";
import './Notepad.css';

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
        <div className="textbox" className="row">
           <label for="notepad"> Notepad:</label><br/>
            <form>
                <textarea onChange={onChange} value={text} rows="100" cols="100" placeholder="Start typing here, for real-time peer programming" />
            </form>
        </div>
    );
}