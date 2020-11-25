import { makeRequest } from "../utils";

import { showLoader, hideLoader } from "./actions/common";

export function makeRequestWithLoader(
  url = "",
  opts = {},
  dispatch,
  onSuccess,
  onFailure,
  statusCode = 200
) {
  dispatch(showLoader());

  return makeRequest(url, opts)
    .then(async (r) => {
      const { status } = r;
      const resp = await r.json();

      dispatch(hideLoader());

      if (status === statusCode) {
        return dispatch(onSuccess(resp.data));
      } else {
        return dispatch(onFailure(new Error(resp.message)));
      }
    })
    .catch((e) => {
      dispatch(hideLoader());

      return dispatch(onFailure(e));
    });
}
