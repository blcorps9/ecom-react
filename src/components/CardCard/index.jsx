import React, { Component } from "react";
import cx from "classnames";
import _range from "lodash/range";
import _compact from "lodash/compact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MONTHS_SHORT } from "../../config";

function maskCardNumber(num) {
  const len = num.length;
  const last4 = num.substr(-4);

  return last4.padStart(len, "x");
}

export default class CardCard extends Component {
  state = { show: false, hasValue: false };

  onMouseEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ show: true });
  };

  onMouseLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.hasValue) this.setState({ show: false });
  };

  onKeyUp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ hasValue: true });
  };

  render() {
    const { card, onEdit, onDelete, onPayNow } = this.props;
    const currentYear = new Date().getFullYear();
    const { show, hasValue } = this.state;

    return (
      <div
        className="card"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className="card-header d-flex justify-content-between">
          <span>{card.holderName}</span>
          <span>
            <span
              onClick={onEdit}
              data-value={card.id}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={{ prefix: "far", iconName: "edit" }} />
            </span>
            &nbsp;&nbsp;&nbsp;
            <span
              onClick={onDelete}
              data-value={card.id}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={{ prefix: "far", iconName: "trash-alt" }}
              />
            </span>
          </span>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {card.holderName} - {maskCardNumber(card.cardNumber)}
          </h5>

          <form onSubmit={onPayNow}>
            {show && (
              <div className="form-row">
                <div className="form-group col-4">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    name="cvv"
                    minLength={3}
                    maxLength={3}
                    placeholder="123"
                    required
                    onKeyUp={this.onKeyUp}
                  />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="expiryMonth">Expiry Month</label>
                  <select
                    className="form-control"
                    id="expiryMonth"
                    name="expiryMonth"
                  >
                    {MONTHS_SHORT.map((m, index) => (
                      <option value={index} key={index}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-4">
                  <label htmlFor="expiryYear">Expiry Year</label>
                  <select
                    required
                    className="form-control"
                    id="expiryYear"
                    name="expiryYear"
                  >
                    {_range(currentYear, currentYear + 10).map((y) => (
                      <option value={y} key={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <input
              readOnly
              type="text"
              id="card-id"
              name="cardId"
              value={card.id}
              style={{ display: "none" }}
            />

            <button
              type="submit"
              id="pay-now"
              data-value={card.id}
              className={cx("btn", {
                "btn-primary": hasValue,
                "btn-secondary": !hasValue,
              })}
              disabled={!hasValue}
              style={{ cursor: hasValue ? "pointer" : "not-allowed" }}
            >
              Pay with this card
            </button>
          </form>
        </div>
      </div>
    );
  }
}
