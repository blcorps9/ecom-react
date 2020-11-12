import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from "./actions";

const initState = {
  products: [],
  error: null,
  isFetching: false,
};

export default function home(state = initState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { ...state, error: null, isFetching: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, isFetching: false };
    case GET_PRODUCTS_FAILURE:
      return { ...state, error: action.error, isFetching: false };
    default:
      return state;
  }
}
