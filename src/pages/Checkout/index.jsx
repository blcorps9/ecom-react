import React, { Component } from "react";
import _reduce from "lodash/reduce";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";

import PaymentStep from "./components/PaymentStep";
import DeliveryStep from "./components/DeliveryStep";
import ItemsTable from "../../components/ItemsTable";
import CheckoutSteps from "../../components/CheckoutSteps";
import { placeOrder, getDashboard } from "../../store/actions/user";
import { showLoader, hideLoader } from "../../store/actions/common";

const STEPS = [
  { id: 1, label: "Cart" },
  { id: 2, label: "Delivery" },
  { id: 3, label: "Payment" },
];
const stripePromise = loadStripe(STRIPE_KEY);

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      billingAddress: {},
    };
  }

  onSelectStep = (currentStep) => {
    this.setState({ currentStep });
  };

  onClickNext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ currentStep: 1 });
  };

  onSaveBillingAddress = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = {};

    for (let f of e.target) {
      if (f.type !== "submit") {
        formData[f.name] = f.value;
      }
    }

    const {
      email,
      lastName,
      firstName,
      postalCode,
      phoneNumber,
      ...rest
    } = formData;
    const { profile } = this.props;

    const billingAddress = {
      address: {
        ...rest,
        country: "in",
        postal_code: postalCode,
      },
      phone: phoneNumber,
      email: profile.email,
      name: `${firstName} ${lastName}`,
    };

    this.setState({ billingAddress, currentStep: 2 }, this.props.showLoader);
  };

  onPaymentSuccess = (payment) => {
    const { cart } = this.props;

    this.props.showLoader();
    this.props
      .placeOrder({
        cart: cart.id,
        card: payment.id,
        address: "<address-id>",
      })
      .then(this.props.getDashboard)
      .then(() => {
        this.props.history.push("/confirmation");
        this.props.hideLoader();
      })
      .catch((err) => {
        console.log(" err =----> ", err);
        this.props.hideLoader();
      });
  };

  onPaymentFailure = (err) => {
    console.log(" err =----> ", err);
    this.props.hideLoader();
  };

  render() {
    const { cart } = this.props;
    const { currentStep, billingAddress } = this.state;
    const cartTotal = _reduce(
      cart.items,
      (p, c) => p + c.price * c.quantity,
      0
    );

    return (
      <div className="page checkout-page bg-light">
        <div className="row px-5 py-2">
          <div className="col-12 py-3 d-flex justify-content-between">
            <CheckoutSteps
              steps={STEPS}
              currentStep={currentStep}
              onSelectStep={this.onSelectStep}
            />
          </div>

          <div className="card my-2 w-100">
            <div className="card-header d-flex justify-content-between">
              Cart
            </div>
            <div className="card-body">
              <ItemsTable noAction items={cart.items} />
              {currentStep === 0 && (
                <div
                  onClick={this.onClickNext}
                  className="btn btn-primary btn-block"
                >
                  Next
                </div>
              )}
            </div>
          </div>

          <div className="card my-2 w-100">
            <div className="card-header d-flex justify-content-between">
              Billing Address
            </div>
            {currentStep >= 1 && (
              <div className="card-body">
                <DeliveryStep
                  disable={currentStep !== 1}
                  onSubmit={this.onSaveBillingAddress}
                />
              </div>
            )}
          </div>

          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ elements, stripe }) => (
                <PaymentStep
                  stripe={stripe}
                  elements={elements}
                  cartTotal={cartTotal}
                  showForm={currentStep === 2}
                  billingAddress={billingAddress}
                  onSuccess={this.onPaymentSuccess}
                  onFailure={this.onPaymentFailure}
                  showLoader={this.props.showLoader}
                  hideLoader={this.props.hideLoader}
                />
              )}
            </ElementsConsumer>
          </Elements>
        </div>
      </div>
    );
  }
}

export default connect(
  (s) => ({
    cart: s.user.cart,
    profile: s.user.profile,
  }),
  { placeOrder, getDashboard, showLoader, hideLoader }
)(Checkout);
