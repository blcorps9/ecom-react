import _get from "lodash/get";
import { push } from "connected-react-router";

import { makeRequest } from "../../utils";

export const SET_USER_PROP_VALUE = "SET_USER_PROP_VALUE";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const GET_DASHBOARD_REQUEST = "GET_DASHBOARD_REQUEST";
export const GET_DASHBOARD_SUCCESS = "GET_DASHBOARD_SUCCESS";
export const GET_DASHBOARD_FAILURE = "GET_DASHBOARD_FAILURE";

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

export function doLogin(user) {
  return (dispatch, getState) => {
    dispatch(userLoginRequest());

    return makeRequest("/api/auth/login", { method: "POST", data: user })
      .then(async (r) => {
        const { status } = r;
        const resp = await r.json();

        if (status === 200) {
          const redirectTo =
            _get(getState(), ["router", "location", "search"], "") ||
            "?redirectTo=/";

          dispatch(userLoginSuccess(resp.data));

          const urlParams = new URLSearchParams(redirectTo);

          return dispatch(push(urlParams.get("redirectTo") || "/"));
        } else {
          return dispatch(userLoginFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        return dispatch(userLoginFailure(e));
      });
  };
}

export function doRegistration(user, redirectTo) {
  return (dispatch) => {
    dispatch(userRegisterRequest());

    return makeRequest("/api/auth/register", { method: "POST", data: user })
      .then(async (r) => {
        const { status } = r;
        const resp = await r.json();

        if (status === 201) {
          dispatch(userRegisterSuccess(resp.data));

          return dispatch(push(redirectTo));
        } else {
          return dispatch(userRegisterFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        return dispatch(userRegisterFailure(e));
      });
  };
}

export function getDashboard() {
  return (dispatch) => {
    dispatch(getDashboardRequest());

    return makeRequest("/api/users/dashboard")
      .then(async (r) => {
        const { status } = r;
        const resp = await r.json();

        if (status === 200) {
          return dispatch(getDashboardSuccess(resp.data));
        } else {
          return dispatch(getDashboardFailure(new Error(resp.message)));
        }
      })
      .catch((e) => {
        return dispatch(getDashboardFailure(e));
      });
  };
}
