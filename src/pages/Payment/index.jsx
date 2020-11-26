import React, { Component } from "react";
import { connect } from "react-redux";
import _map from "lodash/map";
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";

import CardCard from "../../components/CardCard";
import CardForm from "../../components/CardForm";
import {
  saveCard,
  updateCard,
  deleteCard,
  saveCheckoutData,
} from "../../store/actions/user";

class PaymentPage extends Component {
  state = { showForm: false, editCardId: "" };

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

    console.log(" onClickEdit =----> ");

    if (!this.state.showForm) {
      const cardId = e.currentTarget.getAttribute("data-value");

      this.setState({ showForm: true, editCardId: cardId });
    }
  };

  onCardSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cardId = e.currentTarget.getAttribute("data-value");

    if (addressId) {
      this.props.saveCheckoutData({ cardId });
      // this.props.push("/payment");
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
            <div className="col-12 my-2">
              <CardCard
                card={card}
                onEdit={this.onClickEdit}
                onDelete={this.onClickDelete}
                onSelect={this.onCardSelect}
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

export default connect((s) => ({ cards: s.user.cards }), {
  saveCard,
  updateCard,
  deleteCard,
  saveCheckoutData,
})(PaymentPage);
