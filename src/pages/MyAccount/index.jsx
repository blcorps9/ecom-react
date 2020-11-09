import React from "react";
import { Redirect } from "react-router-dom";

export default function MyAccountPage({ isLoggedIn }) {
  if (isLoggedIn) return "This is a My Account page.";

  return <Redirect from="/my-account" to="/login" />;
}
