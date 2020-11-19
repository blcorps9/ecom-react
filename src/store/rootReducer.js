import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./reducers/user";

import home from "../pages/Home/reducer";

import cart from "../components/ProductCard/reducer";

export default function rootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    home,
    cart,
    user,
  });
}
