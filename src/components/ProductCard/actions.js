import _get from "lodash/get";
import _reduce from "lodash/reduce";
import { makeRequest } from "../../utils";

import { setUserPropValue } from "../../store/actions/user";

export const GET_USER_CART_REQUEST = "GET_USER_CART_REQUEST";
export const GET_USER_CART_SUCCESS = "GET_USER_CART_SUCCESS";
export const GET_USER_CART_FAILURE = "GET_USER_CART_FAILURE";

export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";

export const REMOVE_FROM_CART_REQUEST = "REMOVE_FROM_CART_REQUEST";
export const REMOVE_FROM_CART_SUCCESS = "REMOVE_FROM_CART_SUCCESS";
export const REMOVE_FROM_CART_FAILURE = "REMOVE_FROM_CART_FAILURE";

export function getUserCartRquest() {
  return { type: GET_USER_CART_REQUEST };
}

export function getUserCartSuccess(payload) {
  return { type: GET_USER_CART_SUCCESS, payload };
}
export function getUserCartFailure(error) {
  return { type: GET_USER_CART_FAILURE, error };
}

export function addToCartRquest() {
  return { type: ADD_TO_CART_REQUEST };
}

export function addToCartSuccess(payload) {
  return { type: ADD_TO_CART_SUCCESS, payload };
}
export function addToCartFailure(error) {
  return { type: ADD_TO_CART_FAILURE, error };
}

export function removeFromCartRquest() {
  return { type: REMOVE_FROM_CART_REQUEST };
}

export function removeFromCartSuccess(payload) {
  return { type: REMOVE_FROM_CART_SUCCESS, payload };
}
export function removeFromCartFailure(error) {
  return { type: REMOVE_FROM_CART_FAILURE, error };
}

export function getUserCart() {
  return (dispatch) => {
    dispatch(getUserCartRquest());

    return makeRequest("/api/users/shopping-cart")
      .then(async (r) => {
        const resp = await r.json();

        if (r.status === 200) {
          return dispatch(getUserCartSuccess(resp.data));
        } else {
          return dispatch(getUserCartFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        return dispatch(getUserCartFailure(e));
      });
  };
}

export function addToCart(item) {
  return (dispatch) => {
    dispatch(addToCartRquest());

    return makeRequest("/api/users/shopping-cart/add", {
      method: "POST",
      data: item,
    })
      .then(async (r) => {
        const resp = await r.json();

        if (r.status === 200) {
          const cart = resp.data;
          const cartCount = _reduce(
            _get(cart, ["items"]),
            (p, c) => p + c.quantity,
            0
          );

          dispatch(setUserPropValue({ cart, cartCount }));

          return dispatch(addToCartSuccess(cart));
        } else {
          return dispatch(addToCartFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        return dispatch(addToCartFailure(e));
      });
  };
}

export function onRemoveFromCart(id) {
  return (dispatch) => {
    dispatch(removeFromCartRquest());

    return makeRequest(`/api/users/shopping-cart/${id}`, {
      method: "DELETE",
    })
      .then(async (r) => {
        const resp = await r.json();

        if (r.status === 200) {
          const cart = resp.data;
          const cartCount = _reduce(
            _get(cart, ["items"]),
            (p, c) => p + c.quantity,
            0
          );

          dispatch(setUserPropValue({ cart, cartCount }));

          return dispatch(removeFromCartSuccess(cart));
        } else {
          return dispatch(removeFromCartFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        return dispatch(removeFromCartFailure(e));
      });
  };
}
