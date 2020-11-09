import React from "react";
import { Route, Switch } from "react-router-dom";

import CartPage from "./pages/Cart";
import HomePage from "./pages/Home";
import SalePage from "./pages/Sale";
import OrdersPage from "./pages/Orders";
import AboutUsPage from "./pages/AboutUs";
import NotFoundPage from "./pages/NotFound";
import CategoryPage from "./pages/Category";
import ContactUsPage from "./pages/ContactUs";
import MyAccountPage from "./pages/MyAccount";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact render={(props) => <HomePage {...props} />}></Route>

      <Route path="/about-us" component={AboutUsPage} />
      <Route path="/contact-us" component={ContactUsPage} />
      <Route path="/sale" component={SalePage} />
      <Route path="/cat/:id" component={CategoryPage} />

      {/** Session routes */}
      <Route path="/my-cart">
        <CartPage isLoggedIn />
      </Route>
      <Route path="/my-orders" component={OrdersPage} />
      <Route path="/my-account" component={MyAccountPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
}
