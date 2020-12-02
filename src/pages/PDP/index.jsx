import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _get from "lodash/get";
import _map from "lodash/map";
import _range from "lodash/range";
import { push } from "connected-react-router";

import Hr from "../../components/Hr";
import Dropdown from "../../components/Dropdown";
import Swatches from "../../components/Swatches";
import FavoriteIcon from "../../components/FavoriteIcon";

import { getProdDetails } from "./actions";
import {
  addToCart,
  onRemoveFromCart,
} from "../../components/ProductCard/actions";
import { formatPrice } from "../../utils";

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

  onSelectQuantity = (qty) => {
    this.setState({ quantity: Number(qty) });
  };

  render() {
    const data = this.props.productDetails;

    if (data) {
      const { cart, isLoggedIn, favList } = this.props;
      const { selectedColor, selectedSize, quantity } = this.state;
      const isInCart = _map(_get(cart, ["items"]), "id").includes(data.id);
      const isInFavList = _map(_get(favList, ["items"]), "id");
      const qtyOptions = _map(_range(1, (data.stock || 5) + 1), (o) => ({
        value: o,
        label: o,
      }));

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
                <FavoriteIcon
                  classes="pdp"
                  isFavorite={isInFavList.includes(data.id)}
                  isLoggedIn={isLoggedIn}
                  item={{
                    id: data.id,
                    color: selectedColor,
                    size: selectedSize,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <h1>{data.name}</h1>
            <h4>{data.brand}</h4>
            <h5 className="badge badge-danger">{data.promo}</h5>
            <Hr />
            <div className="row">
              <div
                className={cx("p-0", {
                  "text-secondary": data.salePrice,
                })}
                style={data.salePrice ? { textDecoration: "line-through" } : {}}
              >
                {formatPrice(data.price)}
              </div>
              {data.salePrice && (
                <div className="ml-2 p-0 text-danger">
                  {formatPrice(data.salePrice)}
                </div>
              )}
            </div>
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

            <div className="my-2">
              <div>Quantity</div>
              <Dropdown
                label={quantity}
                options={qtyOptions}
                onSelect={this.onSelectQuantity}
                styles={{
                  height: "140px",
                  overflow: "hidden scroll",
                }}
              />
            </div>

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
                <div className="col-5 px-5">
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
    favList: s.user.favList,
    isLoggedIn: s.user.isLoggedIn,
  }),
  {
    push,
    getProdDetails,
    addToCart,
    onRemoveFromCart,
  }
)(PDP);
