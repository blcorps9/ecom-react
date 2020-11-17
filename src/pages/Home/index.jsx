import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import _map from "lodash/map";
import _intersection from "lodash/intersection";

import Accordion from "../../components/Accordion";
import ProductCard from "../../components/ProductCard";
import Carousel from "../../components/Carousel";

import { getProductsRequest } from "./actions";
import { getUserCart } from "../../components/ProductCard/actions";

class HomePage extends Component {
  state = {
    filters: {},
    products: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (state.products.length === 0 && state.products !== props.home.products) {
      return { products: props.home.products };
    }

    return {};
  }

  componentDidMount() {
    this.props.getProductsRequest();
    this.props.getUserCart();
  }

  onSelectFilter = (e) => {
    // e.preventDefault();
    e.stopPropagation();

    const filter = e.currentTarget.getAttribute("data-filter");
    const value = e.currentTarget.getAttribute("data-value");

    this.setState(
      (pS) => {
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
      },
      () => {
        const { filters } = this.state;
        const { products } = this.props.home;
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

        this.setState({ products: filteredProducts });
      }
    );
  };

  renderFilterCell = (cell, filter) => {
    return (
      <ul className="list-group list-group-flush">
        {cell.map((b, index) => {
          const isChecked = _get(this.state, ["filters", filter], []).includes(
            b
          );

          return (
            <li
              key={index}
              data-filter={filter}
              data-value={b}
              className="list-group-item"
              onClick={this.onSelectFilter}
            >
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input type="checkbox" defaultChecked={isChecked} />
                    &nbsp;&nbsp;
                    {b}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { products } = this.state;
    const { leftNav, error, isFetching } = this.props.home;

    return (
      <div className="row justify-content-center">
        <div className="col-2 p-2 border-right">
          <Accordion
            cells={leftNav.map((cell, index) => {
              return {
                id: String(index),
                header: cell.header,
                headerRightIcon: cell.rightIcon || "",
                body: this.renderFilterCell(cell.body, cell.header),
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
                <ProductCard {...p} />
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
  };
}

const mapDispatchToProps = { getProductsRequest, getUserCart };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
