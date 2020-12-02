import React, { Component } from "react";
import cx from "classnames";
import _range from "lodash/range";
import _compact from "lodash/compact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MONTHS_SHORT } from "../../config";
import { maskCardNumber } from "../../utils";

export default class CardCard extends Component {
  state = { show: false, hasValue: false, selectedCard: "" };

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

  onSelectCard = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedCard = e.currentTarget.getAttribute("data-value");

    if (selectedCard) this.setState({ selectedCard });
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
                    required
                    name="cvv"
                    minLength={3}
                    maxLength={3}
                    placeholder="123"
                    onKeyUp={this.onKeyUp}
                  />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="expiryMonth">Expiry Month</label>
                  <select
                    id="expiryMonth"
                    name="expiryMonth"
                    className="form-control"
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
                    id="expiryYear"
                    name="expiryYear"
                    className="form-control"
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
              id="pay-now"
              type="submit"
              data-value={card.id}
              disabled={!hasValue}
              className={cx("btn", {
                "btn-primary": hasValue,
                "btn-secondary": !hasValue,
              })}
              style={{ cursor: hasValue ? "pointer" : "not-allowed" }}
            >
              {hasValue ? "Pay Now" : "Pay with this card"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
