import { makeRequest } from "../../utils";

export const GET_PRODUCT_DETAILS_REQUEST = "GET_PRODUCT_DETAILS_REQUEST";
export const GET_PRODUCT_DETAILS_SUCCESS = "GET_PRODUCT_DETAILS_SUCCESS";
export const GET_PRODUCT_DETAILS_FAILURE = "GET_PRODUCT_DETAILS_FAILURE";

export function getProdDetailsRequest() {
  return { type: GET_PRODUCT_DETAILS_REQUEST };
}
export function getProdDetailsSuccess(payload) {
  return { type: GET_PRODUCT_DETAILS_SUCCESS, payload };
}
export function getProdDetailsFailure(error) {
  return { type: GET_PRODUCT_DETAILS_FAILURE, error };
}

export function getProdDetails(id) {
  return (dispatch) => {
    dispatch(getProdDetailsRequest());

    return makeRequest(`/api/bns/product/${id}`)
      .then(async (r) => {
        const { status } = r;
        const resp = await r.json();

        if (status === 200) {
          return dispatch(getProdDetailsSuccess(resp.data));
        } else {
          return dispatch(getProdDetailsFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        return dispatch(getProdDetailsFailure(e));
      });
  };
}
