import { makeRequest } from "../../utils";

export const GET_USER_CART_REQUEST = "GET_USER_CART_REQUEST";
export const GET_USER_CART_SUCCESS = "GET_USER_CART_SUCCESS";
export const GET_USER_CART_FAILURE = "GET_USER_CART_FAILURE";

export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";

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

export function getUserCart() {
  return (dispatch) => {
    dispatch(getUserCartRquest());

    return makeRequest("/api/users/shopping-cart")
      .then(async (r) => {
        if (r.status === 200) {
          const resp = await r.json();

          return dispatch(getUserCartSuccess(resp.data));
        } else {
          return dispatch(getUserCartFailure(new Error(r.message)));
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
        if (r.status === 200) {
          const resp = await r.json();

          return dispatch(addToCartSuccess(resp.data));
        } else {
          return dispatch(addToCartFailure(new Error(r.message)));
        }
      })
      .catch((e) => {
        return dispatch(addToCartFailure(e));
      });
  };
}
