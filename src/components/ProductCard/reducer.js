import {
  GET_USER_CART_REQUEST,
  GET_USER_CART_SUCCESS,
  GET_USER_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
} from "./actions";

const initState = {
  data: null,
  error: null,
  isFetching: false,
};

export default function cart(state = initState, action) {
  switch (action.type) {
    case GET_USER_CART_REQUEST:
      return { ...state, error: null, isFetching: true };
    case GET_USER_CART_SUCCESS:
      return { ...state, data: action.payload, isFetching: false };
    case GET_USER_CART_FAILURE:
      return { ...state, error: action.error, isFetching: false };
    case ADD_TO_CART_REQUEST:
      return { ...state, error: null, isFetching: true };
    case ADD_TO_CART_SUCCESS:
      return { ...state, data: action.payload, isFetching: false };
    case ADD_TO_CART_FAILURE:
      return { ...state, error: action.error, isFetching: false };

    default:
      return state;
  }
}
