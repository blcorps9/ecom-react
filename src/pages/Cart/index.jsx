import React from "react";
import { Redirect } from "react-router-dom";

export default function CartPage({ isLoggedIn }) {
  if (isLoggedIn) return "This is a Cart page.";

  return <Redirect from="/my-cart" to="/login" />;
}
