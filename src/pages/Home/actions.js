export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export function inc() {
  return { type: INCREMENT };
}

export function dec() {
  return { type: DECREMENT };
}

export function asyncInc() {
  return (dispatch) =>
    setTimeout(() => {
      return dispatch(inc());
    }, 2000);

  // return setTimeout(() => {
  //   return { type: INCREMENT };
  // });
}
