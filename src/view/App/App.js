import React, { useState } from 'react';

import './App.css';
import Client from "../Client/Client";

function App() 
{
    const [loadClient, setLoadClient] = useState(true);

    return (
        <div className="App">
            {/* Load or unload the client */}
            <button onClick={() => setLoadClient(prevState => !prevState)}>Stop/Start Client</button>
            <header className="App-header">
                {/* Socket IO Client */}
                {loadClient ? <Client /> : "Client Offline"}
            </header>
        </div>
    );
}

export default App;

