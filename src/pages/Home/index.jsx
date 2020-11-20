import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import _orderBy from "lodash/orderBy";
import _intersection from "lodash/intersection";

import Accordion from "../../components/Accordion";
import ProductCard from "../../components/ProductCard";
import Carousel from "../../components/Carousel";

import { getProductsRequest } from "./actions";

class HomePage extends Component {
  state = {
    orderBy: "A-Z",
    filters: {},
    products: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { products } = this.props.home;

    if (
      products.length > 0 &&
      prevProps.home.products.length !== products.length
    ) {
      this.setState({ products: _orderBy(products, "name", "asc") });
    } else if (
      !_isEmpty(this.state.filters) &&
      prevState.filters !== this.state.filters
    ) {
      this.setState({
        products: this.getSortedProducts(this.getFilteredProducts(products)),
      });
    } else if (prevState.orderBy !== this.state.orderBy) {
      this.setState((pS) => ({
        products: this.getSortedProducts(pS.products),
      }));
    }
  }

  componentDidMount() {
    this.props.getProductsRequest();
  }

  onChangeSortBy = (e) => {
    // e.preventDefault();
    e.stopPropagation();

    const value = e.currentTarget.getAttribute("data-value");

    this.setState({ orderBy: value });
  };

  onSelectFilter = (e) => {
    // e.preventDefault();
    e.stopPropagation();

    const filter = e.currentTarget.getAttribute("data-filter");
    const value = e.currentTarget.getAttribute("data-value");

    this.setState((pS) => {
      const old = pS.filters[filter] || [];

      if (old.includes(value)) {
        return {
          filters: {
            ...pS.filters,
            [filter]: old.filter((f) => f !== value),
          },
        };
      }

      return {
        filters: { ...pS.filters, [filter]: [...old, value] },
      };
    });
  };

  cancelEvent = (e) => {
    e.stopPropagation();
  };

  getSortedProducts = (products) => {
    const { orderBy } = this.state;

    switch (orderBy) {
      case "A-Z":
        return _orderBy(products, "name", "asc");
      case "Z-A":
        return _orderBy(products, "name", "desc");
      case "Price Low-High":
        return _orderBy(products, "price", "asc");
      case "Price High-Low":
        return _orderBy(products, "price", "desc");
      default:
        return products;
    }
  };

  getFilteredProducts = (products) => {
    const { filters } = this.state;
    const filterKeys = Object.keys(filters);

    const filteredProducts = products.filter((p) => {
      for (let f of filterKeys) {
        const stateFilter = _get(filters, [f], []);
        const prodFilter =
          f === "Categories"
            ? [_get(p, ["category"], "")]
            : _get(p, [f.toLowerCase()], []);
        const common = _intersection(stateFilter, prodFilter);

        if (common.length !== stateFilter.length) {
          return false;
        }
      }

      return true;
    });

    return filteredProducts;
  };

  renderFilterCell = (cell, filter, isRadioBtn) => {
    const { orderBy, filters } = this.state;

    return (
      <ul className="list-group list-group-flush">
        {cell.map((b, index) => {
          let isChecked = _get(filters, [filter], []).includes(b);

          if (isRadioBtn) {
            isChecked = orderBy === b;
          }

          return (
            <li
              key={index}
              className="list-group-item"
              onClick={this.cancelEvent}
            >
              <div className="input-group">
                <label
                  htmlFor={`${filter}-${b}`}
                  className="input-group-prepend"
                >
                  <div className="input-group-text">
                    <input
                      name={filter}
                      data-value={b}
                      data-filter={filter}
                      id={`${filter}-${b}`}
                      defaultChecked={isChecked}
                      type={isRadioBtn ? "radio" : "checkbox"}
                      onChange={
                        isRadioBtn ? this.onChangeSortBy : this.onSelectFilter
                      }
                    />
                    &nbsp;&nbsp;
                    {b}
                  </div>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { products } = this.state;
    const { home, cart, favList, isLoggedIn } = this.props;
    const { leftNav, error, isFetching } = home;
    const itemsInCart = _map(_get(cart, ["items"]), "id");
    const itemsInFavList = _map(_get(favList, ["items"]), "id");

    return (
      <div className="row justify-content-center">
        <div className="col-2 p-2 border-right">
          <Accordion
            cells={leftNav.map((cell, index) => {
              return {
                id: String(index),
                header: cell.header,
                headerRightIcon: cell.rightIcon || "",
                body: this.renderFilterCell(
                  cell.body,
                  cell.header,
                  cell.radioBtn
                ),
              };
            })}
          />
        </div>
        <div className="col-10 h-100">
          <div className="row" style={{ height: "400px", margin: "24px 9px" }}>
            <Carousel
              auto
              delay={3000}
              slides={[
                { bg: `url(https://loremflickr.com/1000/400?1)` },
                { bg: `url(https://loremflickr.com/1000/400?2)` },
                { bg: `url(https://loremflickr.com/1000/400?3)` },
                { bg: `url(https://loremflickr.com/1000/400?4)` },
                { bg: `url(https://loremflickr.com/1000/400?5)` },
              ]}
            />
          </div>
          <div className="row">
            {_map(products, (p) => (
              <div className="col-3" key={p.id}>
                <ProductCard
                  {...p}
                  isLoggedIn={isLoggedIn}
                  isInCart={itemsInCart.includes(p.id)}
                  isFavorite={itemsInFavList.includes(p.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    cart: state.user.cart,
    favList: state.user.favList,
    isLoggedIn: state.user.isLoggedIn,
  };
}

const mapDispatchToProps = { getProductsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
