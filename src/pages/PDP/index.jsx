import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import _map from "lodash/map";
import _range from "lodash/range";
import { push } from "connected-react-router";

import Hr from "../../components/Hr";
import Swatches from "../../components/Swatches";

import { getProdDetails } from "./actions";
import {
  addToCart,
  onRemoveFromCart,
} from "../../components/ProductCard/actions";
import { formatPrice } from "../../utils";

// Task1: Add fav list functionality
// Task2: Select Quantity functionality

class PDP extends Component {
  state = {
    quantity: 1,
    selectedColor: "",
    selectedSize: "",
  };

  componentDidMount() {
    const id = _get(this.props, ["match", "params", "id"]);

    if (id) this.props.getProdDetails(id);
  }

  onSelectColor = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const color = e.currentTarget.getAttribute("data-value");

    if (color) {
      this.setState({ selectedColor: color });
    }
  };

  onSelectSize = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const size = e.currentTarget.getAttribute("data-value");

    if (size) {
      this.setState({ selectedSize: size });
    }
  };

  onAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { isLoggedIn, productDetails } = this.props;

    if (isLoggedIn) {
      const { id, price } = productDetails;
      const { selectedColor, selectedSize, quantity } = this.state;

      const item = {
        id,
        price,
        quantity,
      };

      if (selectedColor) item.color = selectedColor;
      if (selectedSize) item.size = selectedSize;

      this.props.addToCart(item);
    } else {
      this.props.push("/login");
    }
  };

  onRemoveFromCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { productDetails } = this.props;
    const { id } = productDetails;

    this.props.onRemoveFromCart(id);
  };

  render() {
    const data = this.props.productDetails;

    if (data) {
      const { cart } = this.props;
      const { selectedColor, selectedSize } = this.state;
      const isInCart = _map(_get(cart, ["items"]), "id").includes(data.id);
      // const isInFavList = _map(_get(favList, ["items"]), "id");

      const colors = _map(data.colors, (c) => ({
        value: c,
        isSelected: selectedColor === c,
      }));
      const sizes = _map(data.sizes, (s) => ({
        value: s,
        isSelected: selectedSize === s,
      }));

      return (
        <div className="pdp-page row">
          <div className="col-6">
            <div className="row" style={{ height: "420px", margin: 0 }}>
              <div className="col-2">
                {_range(4).map((i) => (
                  <img
                    key={i}
                    width="100%"
                    height="40px"
                    alt={data.name}
                    src={data.image}
                    className="pdp-alt-img my-1"
                  />
                ))}
              </div>
              <div className="col-10">
                <img
                  src={data.image}
                  alt={data.name}
                  className="pdp-img"
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <h1>{data.name}</h1>
            <h4>{data.brand}</h4>
            <Hr />
            <h2>{formatPrice(data.price)}</h2>
            {colors.length > 0 && (
              <Swatches
                heading="Colors"
                items={colors}
                type="color"
                onClick={this.onSelectColor}
              />
            )}
            {sizes.length > 0 && (
              <Swatches
                heading="Sizes"
                items={sizes}
                type="size"
                onClick={this.onSelectSize}
              />
            )}

            <div className="row flex-row align-items-center justify-content-between">
              <div className="col-5 p-0">
                <div
                  onClick={this.onAddToCart}
                  className="btn btn-primary w-100"
                >
                  Add to cart
                </div>
              </div>
              {isInCart && (
                <div className="col-5 p-5">
                  <div
                    onClick={this.onRemoveFromCart}
                    className="btn btn-secondary w-100"
                  >
                    Remove From cart
                  </div>
                </div>
              )}
            </div>
            <Hr />

            <div className="row product-description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
              totam pariatur eos. Modi placeat vel ex voluptas. Facilis, cum
              fuga vero dolorum iure, error reiciendis quas nobis tempore esse
              nam. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Aliquid libero repudiandae minus harum nisi, ratione architecto
              voluptas mollitia quis eos possimus consectetur ipsa autem,
              dignissimos culpa illum alias doloremque. Reiciendis.
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default connect(
  (s) => ({
    productDetails: s.pdp.data,
    cart: s.user.cart,
    isLoggedIn: s.user.isLoggedIn,
  }),
  {
    push,
    getProdDetails,
    addToCart,
    onRemoveFromCart,
  }
)(PDP);
