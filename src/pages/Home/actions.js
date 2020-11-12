import _map from "lodash/map";

import { makeRequest, uuidv4 } from "../../utils";

export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";

export function getProductsRequest() {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    makeRequest("/api/bns/search")
      .then(async (r) => {
        if (r.status === 200) {
          const resp = await r.json();

          const prodList = _map(resp.data, (p) => {
            const colors = _map(p.colors, (c, i) => ({
              isSelected: i === 0,
              value: c,
            }));
            const sizes = _map(p.sizes, (c, i) => ({
              isSelected: i === 0,
              value: c,
            }));

            return { ...p, colors, sizes };
          });

          dispatch(getProductsSuccess(prodList));
        } else {
          dispatch(getProductsFailure(new Error(r.message)));
        }
      })
      .catch((e) => {
        dispatch(getProductsFailure(e));
      });
  };
}

export function getProductsSuccess(payload) {
  return { type: GET_PRODUCTS_SUCCESS, payload };
}

export function getProductsFailure(error) {
  return setTimeout(() => {
    return { type: GET_PRODUCTS_FAILURE, error };
  });
}
