import React from "react";

const CounterView = (props) =>
{
    return (
        <div>
            Counter: {props.counter}
            <br/>
            <button onClick={() => props.onIncrement()}>+</button>
            <button onClick={() => props.onIncrement(5)}>+ 5</button>
            <button onClick={() => props.onDecrement()}>-</button>
            <button onClick={() => props.onDecrement(5)}>- 5</button>
        </div>
    );
};

export default CounterView;