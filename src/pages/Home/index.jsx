import React, { Component } from "react";
import _range from "lodash/range";
import { connect } from "react-redux";

import Accordion from "../../components/Accordion";
import ProductCard from "../../components/ProductCard";

import { getProductsRequest } from "./actions";
import { uuidv4 } from "../../utils";

// TODO: Carousel - Monday

function getCell(i) {
  const cell = {
    id: uuidv4(),
    header: `Item #${i}`,
    headerRightIcon: "",
    body: (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input type="checkbox" /> &nbsp;&nbsp;Cras justo odio
              </div>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input type="checkbox" /> &nbsp;&nbsp;Cras justo odio
              </div>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input type="checkbox" /> &nbsp;&nbsp;Cras justo odio
              </div>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input type="checkbox" /> &nbsp;&nbsp;Cras justo odio
              </div>
            </div>
          </div>
        </li>
      </ul>
    ),
  };

  return cell;
}

class HomePage extends Component {
  componentDidMount() {
    this.props.getProductsRequest();
  }

  render() {
    const { products, error, isFetching } = this.props.home;

    return (
      <div className="row justify-content-center">
        <div className="col-2 p-2 border-right">
          <Accordion cells={_range(4).map(getCell)} />
        </div>
        <div className="col-10 h-100">
          <div className="row">
            {products.map((p) => (
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

const mapDispatchToProps = { getProductsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
