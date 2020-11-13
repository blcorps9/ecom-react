import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  SET_LEFT_NAV,
} from "./actions";

const initState = {
  leftNav: [],
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
    case SET_LEFT_NAV:
      return { ...state, leftNav: action.payload };
    default:
      return state;
  }
}
