import * as actions from "./actions";

const initState = {
  data: null,
  error: null,
  isFetching: false,
};

export default function pdp(state = initState, action) {
  switch (action.type) {
    case actions.GET_PRODUCT_DETAILS_REQUEST:
      return { ...state, isFetching: true };
    case actions.GET_PRODUCT_DETAILS_SUCCESS:
      return { ...state, isFetching: false, data: action.payload };
    case actions.GET_PRODUCT_DETAILS_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
