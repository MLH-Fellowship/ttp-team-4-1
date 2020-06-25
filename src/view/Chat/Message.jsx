import React, { useEffect, useState } from "react";

export default function Message(props)
{
    return (
        <p>{props.chatMsg}</p>
    );
}