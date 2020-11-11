const { createStore, combineReducers } = require("redux");
const initState1 = { n: 3 };
const reducer1 = (state = initState1, action) => {
  switch (action.type) {
    case "INCREMENT1":
      return { ...state, n: state.n + 1 };
    case "DECREMENT1":
      return { ...state, n: state.n - 1 };
    default:
      return state;
  }
};
const initState2 = { n: 3 };
const reducer2 = (state = initState2, action) => {
  switch (action.type) {
    case "INCREMENT2":
      return { ...state, n: state.n + 1 };
    case "DECREMENT2":
      return { ...state, n: state.n - 1 };
    default:
      return state;
  }
};
//
// index.js -> App.jsx
// application state ~= component state 100s
// 1 - reducer
// 2 - reducer, middleware
// 3 - reducer, initState, middleware
const store = createStore(combineReducers({ reducer1, reducer2 }));
// subscribe, dispatch, getState, replaceReducer
// lazy loading ~ code-spliting
console.log("---current state----", store.getState());
store.subscribe(() => {
  console.log("---current state----", store.getState());
});

const asyncCall = () => {
  // setTimeout(() => ({ type: 'INCREMENT1' }), 1000);

  return { type: "INCREMENT1" };
};
store.dispatch(asyncCall());
store.dispatch({ type: "INCREMENT1" });
store.dispatch({ type: "DECREMENT1" });
