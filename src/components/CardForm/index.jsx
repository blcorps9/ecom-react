import React, { Component } from "react";
import _map from "lodash/map";
import _get from "lodash/get";
import _range from "lodash/range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { detectCardType } from "../../utils";
import { MONTHS_SHORT, CARD_NUM_LENGTHS } from "../../config";

export default class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: _get(props.card, ["cardNumber"], ""),
      cardType: _get(props.card, ["type"], ""),
    };
  }

  onChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const num = e.currentTarget.value.replace(/[^\d]+/, "");
    const cardType = detectCardType(num);

    this.setState({ cardNumber: num, cardType });
  };

  render() {
    const { cardNumber, cardType } = this.state;
    const { card, isEdit, onSubmit } = this.props;
    const currentYear = new Date().getFullYear();

    return (
      <form className="card-form" onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              required
              defaultValue={isEdit ? card.firstName : ""}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              required
              defaultValue={isEdit ? card.lastName : ""}
            />
          </div>
        </div>
        <div className="form-group" style={{ position: "relative" }}>
          <label htmlFor="cardNumber">Card No</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            placeholder="4444 1111 2222 3333"
            required
            value={cardNumber}
            onChange={this.onChange}
            style={{ paddingLeft: "48px" }}
            minLength={CARD_NUM_LENGTHS[cardType] || 16}
            maxLength={CARD_NUM_LENGTHS[cardType] || 16}
          />
          <span style={{ position: "absolute", top: "35px", left: "6px" }}>
            <input
              readOnly
              type="text"
              id="type"
              name="type"
              value={cardType}
              style={{ display: "none" }}
            />
            {cardType && (
              <FontAwesomeIcon
                size="2x"
                color="var(--color-dodgerblue)"
                icon={{ prefix: "fab", iconName: `cc-${cardType}` }}
                className="payment-opts"
              />
            )}
          </span>
        </div>

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
              defaultValue={isEdit ? card.cvv : ""}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="expiryMonth">Expiry Month</label>
            <select
              className="form-control"
              id="expiryMonth"
              name="expiryMonth"
              defaultValue={isEdit ? card.expiryMonth : 0}
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
              defaultValue={isEdit ? card.expiryYear : currentYear}
            >
              {_range(currentYear, currentYear + 10).map((y) => (
                <option value={y} key={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="isDefault"
              name="isDefault"
            />
            <label className="form-check-label" htmlFor="isDefault">
              Save as default
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    );
  }
}
