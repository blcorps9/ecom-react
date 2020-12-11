import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SITE_NAME } from "../../config";
import { doLogOut } from "../../store/actions/user";
import { getProductsRequest } from "../../pages/Home/actions";

function Header(props) {
  const { userName, cartCount, isLoggedIn } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
      <NavLink className="navbar-brand" to="/">
        🛍 {SITE_NAME}
      </NavLink>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/my-account">
              {userName ? `Hi, ${userName}` : "My Account"}{" "}
              <FontAwesomeIcon
                icon={{ prefix: "fa", iconName: "user-circle" }}
              />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cat">
              Category
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sale">
              Sale
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/my-cart">
              Cart{" "}
              <FontAwesomeIcon
                icon={{ prefix: "fa", iconName: "shopping-cart" }}
              />
              {cartCount > 0 && (
                <span className="badge badge-danger">{cartCount}</span>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/my-orders">
              Orders
            </NavLink>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <span className="nav-link" onClick={props.doLogOut}>
                Logout
              </span>
            </li>
          )}
        </ul>
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            try {
              const query = e.target.query.value;

              props.getProductsRequest({ name: query });
            } catch (err) {
              console.log(" SearchBoxError =----> ", err.message);
            }
          }}
        >
          <input
            name="query"
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search product"
          />
          <button
            className="btn bg-success text-light btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default connect(null, { doLogOut, getProductsRequest })(Header);
