import React, { Component } from "react";
import cx from "classnames";
import _map from "lodash/map";
import _size from "lodash/size";
import _find from "lodash/find";
import _compact from "lodash/compact";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { push } from "connected-react-router";

import Pagination from "../../components/Pagination";
import ItemsTable from "../../components/ItemsTable";
import { getProductsRequest } from "../Home/actions";
import { maskCardNumber, isPastDate } from "../../utils";
import { addToCart } from "../../components/ProductCard/actions";

class OrdersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showItems: "",

      currentPage: 0,
      itemsPerPage: 3,
      totalPages: _size(props.orders),
    };
  }

  componentDidMount() {
    this.props.getProductsRequest();
  }

  componentDidUpdate(prevProps) {
    if (_size(prevProps.orders) !== _size(this.props.orders)) {
      this.setState((pS) => ({
        totalPages: Math.ceil(_size(this.props.orders) / pS.itemsPerPage),
      }));
    }
  }

  onPaginationChange = (opts) => {
    const { currentPage, itemsPerPage } = opts;

    this.setState({
      currentPage,
      itemsPerPage,
      totalPages: Math.ceil(_size(this.props.orders) / itemsPerPage),
    });
  };

  onShowAllItems = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const orderId = e.currentTarget.getAttribute("data-order");

    this.setState({ showItems: orderId });
  };

  onAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const itemId = e.currentTarget.getAttribute("data-value");
    const item = _find(this.props.products, ({ id }) => id === itemId);

    if (_size(item.colors) || _size(item.sizes)) {
      this.props.push(item.detailsPage);
    } else {
      this.props.addToCart({ id: itemId, price: item.price, quantity: 1 });
    }
  };

  render() {
    const { isLoggedIn, orders, addresses, cards, products } = this.props;
    const { itemsPerPage, currentPage, totalPages, showItems } = this.state;

    if (orders) {
      return (
        <div className="orders-page">
          <div className="row px-5 py-2">
            <div className="card w-100" style={{ fontWeight: "500" }}>
              <div className="card-header">My Order</div>
              <ul className="list-group list-group-flush">
                {orders
                  .slice(
                    itemsPerPage * currentPage,
                    itemsPerPage * currentPage + itemsPerPage
                  )
                  .map((o) => {
                    const dd = new Date(o.deliveryDate);
                    const delivered = isPastDate(dd);
                    const address = _find(
                      addresses,
                      ({ id }) => id === o.address
                    );
                    const card = _find(cards, ({ id }) => id === o.card);
                    let items = [];

                    if (showItems === o.id) {
                      items = _map(o.items, (i) => {
                        const item = _find(products, ({ id }) => id === i.id);

                        return { ...item, ...i };
                      });
                    }

                    return (
                      <li className="list-group-item" key={o.id}>
                        <div className="card w-100">
                          <div className="card-header d-flex justify-content-between">
                            <span>{o.id}</span>
                            <span>
                              Order Total: <strong>{o.total}</strong>
                            </span>
                            <span
                              className={cx({
                                "text-info": !delivered,
                                "text-success": delivered,
                              })}
                            >
                              Status: {delivered ? "Delivered" : "In Transit"}
                            </span>
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <span>
                                Delivery Address:{" "}
                                {_compact(
                                  [
                                    address.fullName,
                                    address.line1,
                                    address.line2,
                                    address.postalCode,
                                  ].join(", ")
                                )}
                              </span>
                            </li>
                            <li className="list-group-item">
                              <span>
                                Payment Method:{" "}
                                {_compact(
                                  [
                                    card.holderName,
                                    maskCardNumber(card.cardNumber),
                                  ].join(", ")
                                )}
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Number of Items: {o.items.length}</span>
                              <span
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                                data-order={o.id}
                                onClick={this.onShowAllItems}
                              >
                                Show all Items
                              </span>
                            </li>
                            {showItems === o.id && (
                              <li className="list-group-item">
                                <ItemsTable
                                  items={items}
                                  actionLabel="Add to Cart"
                                  onAction={this.onAddToCart}
                                />
                              </li>
                            )}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <Pagination
                onChange={this.onPaginationChange}
                config={{ itemsPerPage, currentPage, totalPages }}
                classes="card-footer d-flex justify-content-between"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <Redirect
        from="/my-orders"
        to={{ pathname: "/login", search: "?redirectTo=/my-orders" }}
      />
    );
  }
}

export default connect(
  (s) => ({
    cards: s.user.cards,
    orders: s.user.orders,
    products: s.home.products,
    addresses: s.user.addresses,
    isLoggedIn: s.user.isLoggedIn,
  }),
  { push, addToCart, getProductsRequest }
)(OrdersPage);
