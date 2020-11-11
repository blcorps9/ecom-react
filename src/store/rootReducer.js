import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import counter from "../pages/Home/reducer";

export default function rootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    counter,
  });
}
