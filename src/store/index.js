import thunk from "redux-thunk";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "./rootReducer";

const isDev = process.env.NODE_ENV === "development";
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
const composeEnhancers = compose;

const middlewares = [thunk];

if (isDev) {
  middlewares.push(logger);
}

export const history = createBrowserHistory();

export default function configureStore(history) {
  const store = createStore(
    rootReducer(history),
    composeEnhancers(applyMiddleware(routerMiddleware(history), ...middlewares))
  );

  return store;
}
