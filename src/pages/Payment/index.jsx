import React, { Component } from "react";
import { connect } from "react-redux";
import _map from "lodash/map";
import _find from "lodash/find";
import _reduce from "lodash/reduce";
import _isEmpty from "lodash/isEmpty";

import CardCard from "../../components/CardCard";
import CardForm from "../../components/CardForm";
import {
  saveCard,
  updateCard,
  deleteCard,
  placeOrder,
  getDashboard,
} from "../../store/actions/user";

class PaymentPage extends Component {
  state = { showForm: false, editCardId: "" };

  componentDidMount() {
    if (this.props.routerAction === "POP") {
      this.props.history.push("/delivery");
    }
  }

  toggleCardForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((pS) => ({ showForm: !pS.showForm }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = {};

    for (let f of e.target) {
      if (f.type === "checkbox") {
        formData[f.name] = f.checked;
      } else if (f.type !== "submit") {
        formData[f.name] = f.value;
      }
    }

    const { firstName, lastName, ...rest } = formData;
    const holderName = `${firstName} ${lastName}`;
    const isEdit = !_isEmpty(this.state.editCardId);

    this.setState({ showForm: false }, () => {
      const payload = { holderName, ...rest };

      if (isEdit) {
        this.props
          .updateCard({ ...payload, id: this.state.editCardId })
          .then(() => {
            this.setState({ editCardId: "" });
          });
      } else {
        this.props.saveCard({ ...rest, holderName });
      }
    });
  };

  onClickDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cardId = e.currentTarget.getAttribute("data-value");

    if (cardId) this.props.deleteCard(cardId);
  };

  onClickEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.showForm) {
      const cardId = e.currentTarget.getAttribute("data-value");

      this.setState({ showForm: true, editCardId: cardId });
    }
  };

  onPayNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = {};

    for (let f of e.target) {
      if (f.type === "checkbox") {
        formData[f.name] = f.checked;
      } else if (f.type !== "submit") {
        formData[f.name] = f.value;
      }
    }

    if (formData.cardId) {
      const { checkoutData, cart } = this.props;

      this.props
        .placeOrder({
          cart: cart.id,
          card: formData.cardId,
          address: checkoutData.addressId,
        })
        .then(this.props.getDashboard)
        .then(() => {
          this.props.history.push("/confirmation");
        });
    }
  };

  render() {
    const { cards } = this.props;
    const { showForm, editCardId } = this.state;

    let cardToBeEdited = null;

    if (editCardId) {
      cardToBeEdited = _find(cards, ({ id }) => id === editCardId);

      const [firstName, lastName] = cardToBeEdited.holderName.split(" ");

      cardToBeEdited = { ...cardToBeEdited, firstName, lastName };
    }

    const isEdit = !_isEmpty(cardToBeEdited);

    return (
      <div className="payment-page px-5">
        <div className="row mx-2 my-3 justify-content-between">
          <div className="col-auto btn-primary">Saved Cards</div>
          <div
            className="col-auto btn btn-primary"
            onClick={this.toggleCardForm}
          >
            Add new card
          </div>
        </div>
        <div className="row">
          {_map(cards, (card) => (
            <div className="col-12 my-2" key={card.id}>
              <CardCard
                card={card}
                onEdit={this.onClickEdit}
                onDelete={this.onClickDelete}
                onPayNow={this.onPayNow}
              />
            </div>
          ))}
        </div>
        {showForm && (
          <div className="row m-5">
            <h2 className="col-12">{isEdit ? "Edit Card" : "Add new Card"}</h2>
            <CardForm
              isEdit={isEdit}
              card={cardToBeEdited}
              onSubmit={this.onSubmit}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (s) => ({
    cart: s.user.cart,
    cards: s.user.cards,
    routerAction: s.router.action,
    checkoutData: s.user.checkoutData,
  }),
  {
    saveCard,
    updateCard,
    deleteCard,
    placeOrder,
    getDashboard,
  }
)(PaymentPage);
