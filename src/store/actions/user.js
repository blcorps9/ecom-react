import _get from "lodash/get";
import { push } from "connected-react-router";

import { showLoader, hideLoader } from "./common";
import { makeRequest } from "../../utils";
import { makeRequestWithLoader } from "../utils";

export const SET_USER_PROP_VALUE = "SET_USER_PROP_VALUE";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const GET_DASHBOARD_REQUEST = "GET_DASHBOARD_REQUEST";
export const GET_DASHBOARD_SUCCESS = "GET_DASHBOARD_SUCCESS";
export const GET_DASHBOARD_FAILURE = "GET_DASHBOARD_FAILURE";

export const ADD_ITEM_TO_FAV_LIST_REQUEST = "ADD_ITEM_TO_FAV_LIST_REQUEST";
export const ADD_ITEM_TO_FAV_LIST_SUCCESS = "ADD_ITEM_TO_FAV_LIST_SUCCESS";
export const ADD_ITEM_TO_FAV_LIST_FAILURE = "ADD_ITEM_TO_FAV_LIST_FAILURE";

export const REMOVE_ITEM_FROM_FAV_LIST_REQUEST =
  "REMOVE_ITEM_FROM_FAV_LIST_REQUEST";
export const REMOVE_ITEM_FROM_FAV_LIST_SUCCESS =
  "REMOVE_ITEM_FROM_FAV_LIST_SUCCESS";
export const REMOVE_ITEM_FROM_FAV_LIST_FAILURE =
  "REMOVE_ITEM_FROM_FAV_LIST_FAILURE";

export const SAVE_ADDRESS_REQUEST = "SAVE_ADDRESS_REQUEST";
export const SAVE_ADDRESS_SUCCESS = "SAVE_ADDRESS_SUCCESS";
export const SAVE_ADDRESS_FAILURE = "SAVE_ADDRESS_FAILURE";

export const UPDATE_ADDRESS_REQUEST = "UPDATE_ADDRESS_REQUEST";
export const UPDATE_ADDRESS_SUCCESS = "UPDATE_ADDRESS_SUCCESS";
export const UPDATE_ADDRESS_FAILURE = "UPDATE_ADDRESS_FAILURE";

export const DELETE_ADDRESS_REQUEST = "DELETE_ADDRESS_REQUEST";
export const DELETE_ADDRESS_SUCCESS = "DELETE_ADDRESS_SUCCESS";
export const DELETE_ADDRESS_FAILURE = "DELETE_ADDRESS_FAILURE";

export const SAVE_CHECKOUT_DATA = "SAVE_CHECKOUT_DATA";

export const SAVE_CARDS_REQUEST = "SAVE_CARDS_REQUEST";
export const SAVE_CARDS_SUCCESS = "SAVE_CARDS_SUCCESS";
export const SAVE_CARDS_FAILURE = "SAVE_CARDS_FAILURE";

export const DELETE_CARD_REQUEST = "DELETE_CARD_REQUEST";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE";

export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

export function saveCheckoutData(payload) {
  return { type: SAVE_CHECKOUT_DATA, payload };
}

export function setUserPropValue(payload) {
  return { type: SET_USER_PROP_VALUE, payload };
}

export function userLoginRequest() {
  return { type: USER_LOGIN_REQUEST };
}
export function userLoginSuccess(payload) {
  return { type: USER_LOGIN_SUCCESS, payload };
}
export function userLoginFailure(error) {
  return { type: USER_LOGIN_FAILURE, error };
}

export function userLogoutRequest() {
  return { type: USER_LOGOUT_REQUEST };
}
export function userLogoutSuccess() {
  return { type: USER_LOGOUT_SUCCESS };
}
export function userLogoutFailure(error) {
  return { type: USER_LOGOUT_FAILURE, error };
}

export function userRegisterRequest() {
  return { type: USER_REGISTER_REQUEST };
}
export function userRegisterSuccess(payload) {
  return { type: USER_REGISTER_SUCCESS, payload };
}
export function userRegisterFailure(error) {
  return { type: USER_REGISTER_FAILURE, error };
}

export function getDashboardRequest() {
  return { type: GET_DASHBOARD_REQUEST };
}
export function getDashboardSuccess(payload) {
  return { type: GET_DASHBOARD_SUCCESS, payload };
}
export function getDashboardFailure(error) {
  return { type: GET_DASHBOARD_FAILURE, error };
}

export function addToFavRequest() {
  return { type: ADD_ITEM_TO_FAV_LIST_REQUEST };
}
export function addToFavSuccess(payload) {
  return { type: ADD_ITEM_TO_FAV_LIST_SUCCESS, payload };
}
export function addToFavFailure(error) {
  return { type: ADD_ITEM_TO_FAV_LIST_FAILURE, error };
}

export function removeFromFavRequest() {
  return { type: REMOVE_ITEM_FROM_FAV_LIST_REQUEST };
}
export function removeFromFavSuccess(payload) {
  return { type: REMOVE_ITEM_FROM_FAV_LIST_SUCCESS, payload };
}
export function removeFromFavFailure(error) {
  return { type: REMOVE_ITEM_FROM_FAV_LIST_FAILURE, error };
}

export function saveAddressRequest() {
  return { type: SAVE_ADDRESS_REQUEST };
}
export function saveAddressSuccess(payload) {
  return { type: SAVE_ADDRESS_SUCCESS, payload };
}
export function saveAddressFailure(error) {
  return { type: SAVE_ADDRESS_FAILURE, error };
}

export function updateAddressRequest() {
  return { type: UPDATE_ADDRESS_REQUEST };
}
export function updateAddressSuccess(payload) {
  return { type: UPDATE_ADDRESS_SUCCESS, payload };
}
export function updateAddressFailure(error) {
  return { type: UPDATE_ADDRESS_FAILURE, error };
}

export function deleteAddressRequest() {
  return { type: DELETE_ADDRESS_REQUEST };
}
export function deleteAddressSuccess(payload) {
  return { type: DELETE_ADDRESS_SUCCESS, payload };
}
export function deleteAddressFailure(error) {
  return { type: DELETE_ADDRESS_FAILURE, error };
}

export function saveCardRequest() {
  return { type: SAVE_CARDS_REQUEST };
}
export function saveCardSuccess(payload) {
  return { type: SAVE_CARDS_SUCCESS, payload };
}
export function saveCardFailure(error) {
  return { type: SAVE_CARDS_FAILURE, error };
}

export function deleteCardRequest() {
  return { type: DELETE_CARD_REQUEST };
}
export function deleteCardSuccess(payload) {
  return { type: DELETE_CARD_SUCCESS, payload };
}
export function deleteCardFailure(error) {
  return { type: DELETE_CARD_FAILURE, error };
}

export function updateCardRequest() {
  return { type: UPDATE_CARD_REQUEST };
}
export function updateCardSuccess(payload) {
  return { type: UPDATE_CARD_SUCCESS, payload };
}
export function updateCardFailure(error) {
  return { type: UPDATE_CARD_FAILURE, error };
}

export function doLogin(user) {
  return (dispatch, getState) => {
    dispatch(userLoginRequest());
    dispatch(showLoader());

    return makeRequest("/api/auth/login", { method: "POST", data: user })
      .then(async (r) => {
        const { status } = r;
        const resp = await r.json();

        if (status === 200) {
          const redirectTo =
            _get(getState(), ["router", "location", "search"], "") ||
            "?redirectTo=/";

          dispatch(hideLoader());
          dispatch(userLoginSuccess(resp.data));

          const urlParams = new URLSearchParams(redirectTo);

          return dispatch(push(urlParams.get("redirectTo") || "/"));
        } else {
          return dispatch(userLoginFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        dispatch(hideLoader());

        return dispatch(userLoginFailure(e));
      });
  };
}

export function doRegistration(user, redirectTo) {
  return (dispatch) => {
    dispatch(userRegisterRequest());
    dispatch(showLoader());

    return makeRequest("/api/auth/register", { method: "POST", data: user })
      .then(async (r) => {
        const { status } = r;
        const resp = await r.json();

        dispatch(hideLoader());

        if (status === 201) {
          dispatch(userRegisterSuccess(resp.data));

          return dispatch(push(redirectTo));
        } else {
          return dispatch(userRegisterFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        dispatch(hideLoader());

        return dispatch(userRegisterFailure(e));
      });
  };
}

export function doLogOut() {
  return (dispatch) => {
    dispatch(userLogoutRequest());
    dispatch(showLoader());

    return makeRequest("/api/auth/logout")
      .then(async (r) => {
        const { status } = r;
        const resp = await r.json();

        dispatch(hideLoader());

        if (status === 200) {
          dispatch(userLogoutSuccess());

          return dispatch(push("/"));
        } else {
          return dispatch(userLogoutFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        dispatch(hideLoader());

        return dispatch(userLogoutFailure(e));
      });
  };
}

export function getDashboard() {
  return (dispatch) => {
    dispatch(getDashboardRequest());
    dispatch(showLoader());

    return makeRequest("/api/users/dashboard")
      .then(async (r) => {
        const { status } = r;
        const resp = await r.json();

        dispatch(hideLoader());

        if (status === 200) {
          return dispatch(getDashboardSuccess(resp.data));
        } else {
          return dispatch(getDashboardFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        dispatch(hideLoader());

        return dispatch(getDashboardFailure(e));
      });
  };
}

export function addToFav(item) {
  return (dispatch) => {
    dispatch(addToFavRequest());
    dispatch(showLoader());

    return makeRequest("/api/users/shopping-list/add", {
      method: "POST",
      data: item,
    })
      .then(async (r) => {
        const { status } = r;
        const resp = await r.json();

        dispatch(hideLoader());

        if (status === 200) {
          return dispatch(addToFavSuccess(resp.data));
        } else {
          return dispatch(addToFavFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        dispatch(hideLoader());

        return dispatch(addToFavFailure(e));
      });
  };
}
export function removeFromFav(id) {
  return (dispatch) => {
    dispatch(removeFromFavRequest());

    return makeRequestWithLoader(
      `/api/users/shopping-list/remove/${id}`,
      { method: "DELETE" },
      dispatch,
      removeFromFavSuccess,
      removeFromFavFailure
    );
  };
}

export function saveAddress(address) {
  return (dispatch) => {
    dispatch(saveAddressRequest());

    return makeRequestWithLoader(
      "/api/users/addresses",
      { method: "POST", data: address },
      dispatch,
      saveAddressSuccess,
      saveAddressFailure,
      201
    );
  };
}

export function updateAddress(address) {
  return (dispatch) => {
    dispatch(updateAddressRequest());

    return makeRequestWithLoader(
      `/api/users/addresses/${address.id}`,
      { method: "PUT", data: address },
      dispatch,
      updateAddressSuccess,
      updateAddressFailure
    );
  };
}

export function deleteAddress(id) {
  return (dispatch) => {
    dispatch(deleteAddressRequest());

    return makeRequestWithLoader(
      `/api/users/addresses/${id}`,
      { method: "DELETE" },
      dispatch,
      () => deleteAddressSuccess(id),
      deleteAddressFailure
    );
  };
}

export function saveCard(card) {
  return (dispatch) => {
    dispatch(saveCardRequest());

    return makeRequestWithLoader(
      "/api/users/cards",
      { method: "POST", data: card },
      dispatch,
      saveCardSuccess,
      saveCardFailure,
      201
    );
  };
}

export function deleteCard(id) {
  return (dispatch) => {
    dispatch(deleteCardRequest());

    return makeRequestWithLoader(
      `/api/users/cards/${id}`,
      { method: "DELETE" },
      dispatch,
      () => deleteCardSuccess(id),
      deleteCardFailure
    );
  };
}

export function updateCard(card) {
  return (dispatch) => {
    dispatch(updateCardRequest());

    return makeRequestWithLoader(
      `/api/users/cards/${card.id}`,
      { method: "PUT", data: card },
      dispatch,
      updateCardSuccess,
      updateCardFailure
    );
  };
}
