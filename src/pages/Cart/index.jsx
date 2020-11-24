import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import _find from "lodash/find";

import { onRemoveFromCart } from "../../components/ProductCard/actions";
import { getDashboard } from "../../store/actions/user";
import { formatPrice } from "../../utils";
import Hr from "../../components/Hr";

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
      const tabHeader = ["#", "Name", "Brand", "Quantity", "Price"];
      const hasSize = !!_find(cart.items, (i) => i.size);
      const hasColor = !!_find(cart.items, (i) => i.color);

      let orderTotal = 0;

      if (hasSize) tabHeader.push("Size");
      if (hasColor) tabHeader.push("Color");

      tabHeader.push("Remove");

      return (
        <div className="cart-page px-2">
          <h2>Shopping Cart</h2>
          <Hr />
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                {tabHeader.map((h, index) => (
                  <th key={index} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cart.items.map((i, index) => {
                orderTotal += i.price * i.quantity;

                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{i.name}</td>
                    <td>{i.brand}</td>
                    <td>{i.quantity}</td>
                    <td>{formatPrice(i.price)}</td>
                    {hasSize && <td>{i.size}</td>}
                    {hasColor && <td>{i.color}</td>}

                    <td>
                      <span
                        data-value={i.id}
                        onClick={this.onRemove}
                        className="btn btn-primary"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="order-summary p-2">
            <div className="row text-center">
              <div className="col-6">
                Order Total: {formatPrice(orderTotal)}
              </div>
              <div className="col-6">
                <span className="btn btn-primary">Checkout</span>
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
