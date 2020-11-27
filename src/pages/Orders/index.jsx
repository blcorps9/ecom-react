import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function OrdersPage({ isLoggedIn, orders }) {
  console.log(" orders =----> ", orders);
  if (isLoggedIn) return "This is a Orders page.";

  return (
    <Redirect
      from="/my-orders"
      to={{ pathname: "/login", search: "?redirectTo=/my-orders" }}
    />
  );
}

export default connect((s) => ({
  orders: s.user.orders,
  isLoggedIn: s.user.isLoggedIn,
}))(OrdersPage);
