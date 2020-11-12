import React, { Component } from "react";
import _isEmpty from "lodash/isEmpty";

import Swatches from "../Swatches";

import { formatPrice } from "../../utils";

export default class ProductCard extends Component {
  render() {
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
                items={colors}
                type="color"
                onClick={() => {}}
              />
            </div>
          )}
          {!_isEmpty(sizes) && (
            <div className="row sizes swatches my-2">
              <Swatches
                heading="Sizes"
                items={sizes}
                type="size"
                onClick={() => {}}
              />
            </div>
          )}
          <div className="row cta m-0 flex-row align-items-center justify-content-between">
            <div className="col-4 p-0">{formatPrice(price)}</div>
            <div className="col-8 p-0">
              <a href="#" className="btn btn-primary">
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
