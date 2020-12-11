import React from "react";

export default function Overlay({ show, children }) {
  const style = {
    display: show ? "flex" : "none",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100vw",
    height: "100vh",

    backgroundColor: "rgba(0, 0, 0, 0.3)",

    justifyContent: "center",
    alignItems: "center",
    // zIndex: "1",
  };

  return (
    <div className="modal-overlay" style={style}>
      {children}
    </div>
  );
}
