import * as actions from "../actions/common";

const initState = {
  spinner: false,
};

export default function common(state = initState, action) {
  switch (action.type) {
    case actions.SHOW_LOADER:
      return { ...state, spinner: true };
    case actions.HIDE_LOADER:
      return { ...state, spinner: false };
    default:
      return state;
  }
}
