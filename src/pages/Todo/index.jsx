/* eslint-disable */
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useReducer,
  useRef,
} from "react";
import ReactDOM from "react-dom";

import Row from "./Row";
import Modal from "./Modal";
import Overlay from "./Overlay";

function cntrReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, cntr: state.cntr + 1 };
    case "DECREMENT":
      return { ...state, cntr: state.cntr - 1 };
    default:
      return state;
  }
}

function AppModal() {
  return ReactDOM.createPortal(
    <Overlay show>
      <Modal show />
    </Overlay>,
    document.getElementById("modal-mount")
  );
}

export default function Todos() {
  // const [cntr, setCntr] = useState(0);
  const [store, dispatch] = useReducer(cntrReducer, { cntr: 0 });

  const onInc = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      // setCntr((c) => c + 1);
      dispatch({ type: "INCREMENT" });
    },
    [dispatch]
  );

  const onDec = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      // setCntr((c) => c - 1);
      dispatch({ type: "DECREMENT" });
    },
    [dispatch]
  );

  return (
    <React.Suspense fallback={null}>
      <div
        className="parent-for-modal"
        onClick={(e) => {
          console.log(" e =----> ", e);
        }}
      >
        <AppModal />
      </div>

      <div className="container m-5">
        <Row onInc={onInc} onDec={onDec} cntr={store.cntr} />
      </div>
    </React.Suspense>
  );
}
