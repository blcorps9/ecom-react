import React from "react";
import _isEmpty from "lodash/isEmpty";
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
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import PDP from "./pages/PDP";

export default function Routes({ user, isLoggedIn }) {
  return (
    <Switch>
      <Route path="/" exact render={(props) => <HomePage {...props} />}></Route>

      <Route path="/login" render={(p) => <LoginPage {...p} />} />
      <Route path="/register" render={(p) => <RegistrationPage {...p} />} />
      <Route path="/about-us" component={AboutUsPage} />
      <Route path="/contact-us" component={ContactUsPage} />
      <Route path="/sale" component={SalePage} />
      <Route path="/cat/:id" component={CategoryPage} />
      <Route path="/prod/:id/:category/:name" render={(p) => <PDP {...p} />} />
      {/* <Route path="/prod*" render={(p) => <PDP {...p} />} /> */}

      {/** Session routes */}
      <Route path="/my-cart">
        <CartPage isLoggedIn={isLoggedIn} />
      </Route>
      <Route path="/my-orders" component={OrdersPage}>
        <OrdersPage isLoggedIn={isLoggedIn} />
      </Route>
      <Route path="/my-account" component={MyAccountPage}>
        <MyAccountPage isLoggedIn={isLoggedIn} />
      </Route>

      <Route component={NotFoundPage} />
    </Switch>
  );
}
