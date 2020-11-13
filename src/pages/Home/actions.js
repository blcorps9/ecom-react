import _map from "lodash/map";
import _uniq from "lodash/uniq";
import _range from "lodash/range";
import _flatMap from "lodash/flatMap";
import _compact from "lodash/compact";

import { makeRequest, uuidv4 } from "../../utils";

export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";
export const SET_LEFT_NAV = "SET_LEFT_NAV";

export function getProductsRequest() {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    return makeRequest("/api/bns/search")
      .then(async (r) => {
        if (r.status === 200) {
          const resp = await r.json();

          const categories = _uniq(_map(resp.data, "category"));
          const sizes = _uniq(_compact(_flatMap(resp.data, (i) => i.sizes)))
            .map(Number)
            .sort((a, b) => a - b)
            .map(String);
          const colors = _uniq(
            _compact(_flatMap(resp.data, (i) => i.colors))
          ).sort();

          const leftNav = [{ header: "Categories", body: categories }];

          if (sizes.length) {
            leftNav.push({ header: "Sizes", body: sizes });
          }

          if (colors.length) {
            leftNav.push({ header: "Colors", body: colors });
          }

          dispatch(setLeftNav(leftNav));

          return dispatch(getProductsSuccess(resp.data));
        } else {
          return dispatch(getProductsFailure(new Error(r.message)));
        }
      })
      .catch((e) => {
        return dispatch(getProductsFailure(e));
      });
  };
}

export function getProductsSuccess(payload) {
  return { type: GET_PRODUCTS_SUCCESS, payload };
}

export function getProductsFailure(error) {
  return { type: GET_PRODUCTS_FAILURE, error };
}

export function setLeftNav(payload) {
  return { type: SET_LEFT_NAV, payload };
}
