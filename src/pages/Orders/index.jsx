import React from "react";
import { Redirect } from "react-router-dom";

export default function OrdersPage({ isLoggedIn }) {
  if (isLoggedIn) return "This is a Orders page.";

  return (
    <Redirect
      from="/my-orders"
      to={{ pathname: "/login", search: "?redirectTo=/my-orders" }}
    />
  );
}
