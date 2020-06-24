
import types from "./action_types";

// ACTION CREATORS
export function increment(amount = 1)
{
    return { type: types.INCREMENT, amount };
}

export function decrement(amount = 1)
{
    return { type: types.DECREMENT, amount };
}