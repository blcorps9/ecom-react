import React, { Component } from "react";
import cx from "classnames";
import { CardElement } from "@stripe/react-stripe-js";

import { formatPrice, makeRequest } from "../../../utils";

export default class PaymentStep extends Component {
  state = {
    enablePayNow: false,
  };

  onPayNow = (e) => {
    e.preventDefault();

    if (this.state.enablePayNow) {
      const {
        stripe,
        elements,
        cartTotal,
        onSuccess,
        onFailure,
        showLoader,
        billingAddress,
      } = this.props;

      if (!stripe || !elements) return;

      showLoader();
      this.setState({ enablePayNow: false }, async () => {
        const cardElement = elements.getElement(CardElement);
        // Stripe
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingAddress,
        });

        if (error) {
          onFailure(error);
        } else if (paymentMethod.id) {
          // Our backend
          makeRequest("/api/stripe/payment", {
            method: "POST",
            data: {
              amount: cartTotal,
              name: billingAddress.name,
              email: billingAddress.email,
              paymentMethod: paymentMethod.id,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res && res.data && res.data.status === "succeeded") {
                onSuccess(res.data);
              } else {
                onFailure(res.data);
              }
            })
            .catch(onFailure);
        }
      });
    }
  };

  render() {
    const { enablePayNow } = this.state;
    const { showForm, cartTotal } = this.props;
    const options = {
      hidePostalCode: true,
      style: {
        base: {
          fontSize: "16px",
          letterSpacing: "0.025em",
          fontSmoothing: "antialiased",
          color: "var(--color-dodgerblue)",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          "::placeholder": {
            color: "var(--color-pink)",
          },
        },
        invalid: {
          color: "var(--red)",
          iconColor: "var(--red)",
        },
      },
    };

    return (
      <>
        <div className="card my-2 w-100">
          <div className="card-header d-flex justify-content-between">
            <span>Payment</span>
            <span>Cart Total: {formatPrice(cartTotal)}</span>
          </div>
          {showForm && (
            <div className="card-body">
              <CardElement
                options={options}
                onReady={() => {
                  this.props.hideLoader();
                }}
                onChange={(event) => {
                  this.setState({ enablePayNow: event.complete });
                }}
              />
            </div>
          )}
        </div>

        <div
          onClick={this.onPayNow}
          disabled={!enablePayNow}
          style={{ cursor: enablePayNow ? "pointer" : "not-allowed" }}
          className={cx("col-12 p-2 d-flex justify-content-center", {
            "bg-primary": enablePayNow,
            "bg-secondary": !enablePayNow,
          })}
        >
          Pay Now
        </div>
      </>
    );
  }
}
