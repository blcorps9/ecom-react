import React, { Component } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

import Swatches from "../Swatches";

import { formatPrice } from "../../utils";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: _get(props, ["colors", 0], ""),
      size: _get(props, ["sizes", 0], ""),
    };
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

    console.log(" ATC =----> ", e);
  };

  render() {
    const { color, size } = this.state;
    const {
      image,
      name,
      brand,
      description,
      colors,
      sizes,
      price,
    } = this.props;

    return (
      <div className="product-card card m-2">
        <img src={image} className="card-img-top" alt={`${name} - ${brand}`} />
        <div className="card-body">
          <div className="row">
            <h5 className="card-title">
              {name} - {brand}
            </h5>
            <p className="card-text">{description}</p>
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
          <div className="row cta m-0 flex-row align-items-center justify-content-between">
            <div className="col-4 p-0">{formatPrice(price)}</div>
            <div className="col-8 p-0">
              <div onClick={this.onAddToCart} className="btn btn-primary">
                Add to cart
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}