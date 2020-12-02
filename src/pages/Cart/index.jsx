import React, { Component } from "react";
import _size from "lodash/size";
import _reduce from "lodash/reduce";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { onRemoveFromCart } from "../../components/ProductCard/actions";
import { getDashboard } from "../../store/actions/user";
import { formatPrice } from "../../utils";
import Hr from "../../components/Hr";
import ItemsTable from "../../components/ItemsTable";

class CartPage extends Component {
  onRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const id = e.currentTarget.getAttribute("data-value");

    this.props.onRemoveFromCart(id).then(this.props.getDashboard);
  };

  render() {
    const { isLoggedIn, cart } = this.props;

    if (isLoggedIn) {
      if (!_size(cart.items)) return <Redirect to="/" />;

      const orderTotal = _reduce(
        cart.items,
        (p, c) => p + c.price * c.quantity,
        0
      );

      return (
        <div className="cart-page px-2">
          <h2>Shopping Cart</h2>
          <Hr />
          <ItemsTable
            items={cart.items}
            onAction={this.onRemove}
            actionLabel="Remove from Cart"
          />
          <div className="order-summary p-2">
            <div className="row text-center">
              <div className="col-6">
                Order Total: {formatPrice(orderTotal)}
              </div>
              <div className="col-6">
                <Link to="/delivery" className="btn btn-primary">
                  Checkout
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/checkout" className="btn btn-primary">
                  Stripe Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <Redirect from="/my-cart" to="/login?redirectTo=/my-cart" />;
  }
}

export default connect(
  (s) => ({
    cart: s.user.cart,
    isLoggedIn: s.user.isLoggedIn,
  }),
  { onRemoveFromCart, getDashboard }
)(CartPage);
