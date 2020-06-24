import React, { Component } from "react";
import { connect } from "react-redux";

import { increment, decrement } from "../../state/counter/actions";
import CounterView from "./CounterView";

// Smart Container
class CounterContainer extends Component
{
    render()
    {
        return (
            <CounterView 
                counter={this.props.counter}
                onIncrement={this.props.onIncrement}
                onDecrement={this.props.onDecrement}
            />
        );
    }
}

// Map state to props;
function mapState(state)
{
    return { counter: state.counter };
}

// Map dispatch to props
function mapDispatch(dispatch)
{
    return { 
        onIncrement: (amount) => dispatch(increment(amount)),
        onDecrement: (amount) => dispatch(decrement(amount))
    };
}

// Export our store-connected component
export default connect(mapState, mapDispatch)(CounterContainer);