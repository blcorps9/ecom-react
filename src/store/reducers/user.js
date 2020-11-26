import _map from "lodash/map";
import _filter from "lodash/filter";

import * as actions from "../actions/user";

const initState = {
  profile: {},
  cartCount: 0,
  cart: {},
  cards: [],
  orders: [],
  favList: {},
  addresses: [],

  checkoutData: {}, // { cardId, addressId }

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

    case actions.SAVE_ADDRESS_REQUEST:
      return { ...state, isFetching: true };
    case actions.SAVE_ADDRESS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        addresses: [...state.addresses, action.payload],
      };
    case actions.SAVE_ADDRESS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.UPDATE_ADDRESS_REQUEST:
      return { ...state, isFetching: true };
    case actions.UPDATE_ADDRESS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        addresses: _map(state.addresses, (addr) => {
          if (addr.id === action.payload.id) {
            return action.payload;
          }

          return addr;
        }),
      };
    }
    case actions.UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.DELETE_ADDRESS_REQUEST:
      return { ...state, isFetching: true };
    case actions.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        addresses: _filter(state.addresses, ({ id }) => id !== action.payload),
      };
    case actions.DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.SAVE_CARDS_REQUEST:
      return { ...state, isFetching: true };
    case actions.SAVE_CARDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cards: [...state.cards, action.payload],
      };
    case actions.SAVE_CARDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.DELETE_CARD_REQUEST:
      return { ...state, isFetching: true };
    case actions.DELETE_CARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cards: _filter(state.cards, ({ id }) => id !== action.payload),
      };
    case actions.DELETE_CARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.UPDATE_CARD_REQUEST:
      return { ...state, isFetching: true };
    case actions.UPDATE_CARD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        cards: _map(state.cards, (card) => {
          if (card.id === action.payload.id) {
            return action.payload;
          }

          return card;
        }),
      };
    }
    case actions.UPDATE_CARD_FAILURE:
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

    case actions.SAVE_CHECKOUT_DATA:
      return {
        ...state,
        checkoutData: { ...state.checkoutData, ...action.payload },
      };
    default:
      return state;
  }
}
