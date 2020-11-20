import * as actions from "../actions/user";

const initState = {
  profile: {},
  cartCount: 0,
  cart: {},
  cards: [],
  orders: [],
  favList: {},
  addresses: [],

  error: null,
  isFetching: false,
  isLoggedIn: false,
};

export default function user(state = initState, action) {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        profile: action.payload,
      };
    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        error: action.error,
      };

    case actions.USER_LOGOUT_REQUEST:
      return { ...state, isFetching: true };
    case actions.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        profile: {},
        cartCount: 0,
        cart: {},
        cards: [],
        orders: [],
        favList: {},
        addresses: [],
      };
    case actions.USER_LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        error: action.error,
      };

    case actions.USER_REGISTER_REQUEST:
      return { ...state, isFetching: true };
    case actions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        profile: action.payload,
      };
    case actions.USER_REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        error: action.error,
      };

    case actions.GET_DASHBOARD_REQUEST:
      return { ...state, isFetching: true };
    case actions.GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        ...action.payload,
      };
    case actions.GET_DASHBOARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        error: action.error,
      };

    case actions.ADD_ITEM_TO_FAV_LIST_REQUEST:
      return { ...state, isFetching: true };
    case actions.ADD_ITEM_TO_FAV_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        favList: action.payload,
      };
    case actions.ADD_ITEM_TO_FAV_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.REMOVE_ITEM_FROM_FAV_LIST_REQUEST:
      return { ...state, isFetching: true };
    case actions.REMOVE_ITEM_FROM_FAV_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        favList: action.payload,
      };
    case actions.REMOVE_ITEM_FROM_FAV_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.SET_USER_PROP_VALUE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
