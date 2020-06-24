import types from "./action_types";

// REDUCER
const reducer = (state = 0, action) =>
{
    switch(action.type)
    {
        case types.INCREMENT: return state + action.amount;
        case types.DECREMENT: return state - action.amount;
        default: return state;
    }
};

export default reducer;