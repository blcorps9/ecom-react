/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable operator-linebreak */
import React, { Component } from "react";
import cx from "classnames";
import _get from "lodash/get";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import _debounce from "lodash/debounce";
import { push } from "connected-react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Swatches from "../Swatches";
import FavoriteIcon from "../FavoriteIcon";
import { formatPrice } from "../../utils";
import { addToCart, onRemoveFromCart } from "./actions";
import { getDashboard } from "../../store/actions/user";

function isElemTopVisible(elem) {
  const rect = elem.getBoundingClientRect();

  return rect.top >= 0 && rect.top <= window.innerHeight;
}

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      size: _get(props, ["sizes", 0], ""),
      color: _get(props, ["colors", 0], ""),

      loadImage: false,
    };

    this.cardNode = React.createRef();
    this.onScroll = _debounce(this.onScroll.bind(this), 350, {
      trailing: true,
      leading: false,
    });
  }

  componentDidMount() {
    if (this.cardNode && this.cardNode.current) {
      this.onScroll();
    }

    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    if (!this.state.loadImage && isElemTopVisible(this.cardNode.current)) {
      this.setState({ loadImage: true });
    }
  }

  onSelectColor = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ color: e.currentTarget.getAttribute("data-value") });
  };

  onSelectSize = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ size: e.currentTarget.getAttribute("data-value") });
  };

  onAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { id, price, isLoggedIn } = this.props;

    if (isLoggedIn) {
      const { color, size, quantity } = this.state;

      const item = {
        id,
        price,
        quantity,
      };

      if (color) item.color = color;
      if (size) item.size = size;

      this.props.addToCart(item).then(this.props.getDashboard);
    } else {
      this.props.push("/login");
    }
  };

  onRemoveFromCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onRemoveFromCart(this.props.id);
  };

  render() {
    const { color, size, loadImage } = this.state;
    const {
      id,
      image,
      name,
      brand,
      promo,
      colors,
      sizes,
      price,
      salePrice,
      isInCart,
      isFavorite,
      isLoggedIn,
    } = this.props;

    return (
      <div className="product-card card m-2" ref={this.cardNode}>
        <div className="card-img-top">
          {loadImage && (
            <img
              src={image}
              height="100%"
              className="prod-img"
              alt={`${name} - ${brand}`}
            />
          )}
          <FavoriteIcon
            isFavorite={isFavorite}
            isLoggedIn={isLoggedIn}
            item={{ id, color, size }}
          />
        </div>
        <div className="card-body">
          <div className="row">
            <h5 className="col-12 card-title">
              {name} - {brand}
            </h5>
            <div className="col-12">
              <span className="badge badge-danger">{promo.label}</span>
            </div>
          </div>
          {!_isEmpty(colors) && (
            <div className="row colors swatches my-2">
              <Swatches
                heading="Colors"
                items={colors.map((c) => ({
                  isSelected: c === color,
                  value: c,
                }))}
                type="color"
                onClick={this.onSelectColor}
              />
            </div>
          )}
          {!_isEmpty(sizes) && (
            <div className="row sizes swatches my-2">
              <Swatches
                heading="Sizes"
                items={sizes.map((s) => ({
                  isSelected: s === size,
                  value: s,
                }))}
                type="size"
                onClick={this.onSelectSize}
              />
            </div>
          )}
          <div className="row flex-row align-items-center ">
            <div
              className={cx("p-0", {
                "col-6 text-secondary": salePrice,
                "col-12": !salePrice,
              })}
              style={salePrice ? { textDecoration: "line-through" } : {}}
            >
              {formatPrice(price)}
            </div>
            {salePrice && (
              <div className="col-6 p-0 text-danger">
                {formatPrice(salePrice)}
              </div>
            )}
          </div>
          <div className="row cta m-0 flex-row align-items-center justify-content-between">
            <div className="col-8 p-0">
              <div onClick={this.onAddToCart} className="btn btn-primary">
                Add to cart
              </div>
            </div>
            {isInCart && (
              <div className="col-4 p-0" onClick={this.onRemoveFromCart}>
                <FontAwesomeIcon
                  size="3x"
                  icon={{ prefix: "far", iconName: "window-close" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  addToCart,
  onRemoveFromCart,
  push,
  getDashboard,
})(ProductCard);
