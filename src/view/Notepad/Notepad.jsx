import React, { useEffect, useState } from "react";

export default function Notepad(props)
{
    const [text, setText] = useState("");

    const onChange = (event) =>
    {
        props.socket.emit("update textarea", event.target.value);
    };

    useEffect(() =>
    {
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