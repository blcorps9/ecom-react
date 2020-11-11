import { INCREMENT, DECREMENT } from "./actions";

const initState = 0;

export default function counter(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
