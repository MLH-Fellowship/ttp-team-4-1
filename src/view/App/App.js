import React from 'react';
import './App.css';
import CounterContainer from '../Counter/CounterContainer';

function App() 
{
    return (
        <div className="App">
            <header className="App-header">
                Hello, World!
                <CounterContainer />
            </header>
        </div>
    );
}

export default App;
