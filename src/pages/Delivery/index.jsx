import React, { Component } from "react";
import _map from "lodash/map";
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import AddressForm from "../../components/AddressForm";
import AddressCard from "../../components/AddressCard";
import {
  saveAddress,
  updateAddress,
  deleteAddress,
  saveCheckoutData,
} from "../../store/actions/user";

class DeliveryPage extends Component {
  state = {
    showForm: false,
    editAddressId: "",
  };

  toggleAddressForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((pS) => ({ showForm: !pS.showForm }));
  };

  onClickDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const addrId = e.currentTarget.getAttribute("data-value");

    if (addrId) this.props.deleteAddress(addrId);
  };

  onClickEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.showForm) {
      const addrId = e.currentTarget.getAttribute("data-value");

      this.setState({ showForm: true, editAddressId: addrId });
    }
  };

  onAddressSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const addressId = e.currentTarget.getAttribute("data-value");

    if (addressId) {
      this.props.saveCheckoutData({ addressId });
      this.props.push("/payment");
    }
  };

  onSaveAddress = (e) => {
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
    const isEdit = !_isEmpty(this.state.editAddressId);

    this.setState({ showForm: false }, () => {
      const payload = { fullName: `${firstName} ${lastName}`, ...rest };

      if (isEdit) {
        this.props
          .updateAddress({ ...payload, id: this.state.editAddressId })
          .then(() => {
            this.setState({ editAddressId: "" });
          });
      } else {
        this.props.saveAddress(payload);
      }
    });
  };

  render() {
    const { showForm, editAddressId } = this.state;
    const { addresses } = this.props;
    let addressToBeEdited = null;

    if (editAddressId) {
      addressToBeEdited = _find(addresses, ({ id }) => id === editAddressId);

      const [firstName, lastName] = addressToBeEdited.fullName.split(" ");

      addressToBeEdited = { ...addressToBeEdited, firstName, lastName };
    }

    const isEdit = !_isEmpty(addressToBeEdited);

    return (
      <div className="delivery-page px-5">
        <div className="row mx-2 my-3 justify-content-between">
          <div className="col-auto btn-primary">Saved addresses</div>
          <div
            className="col-auto btn btn-primary"
            onClick={this.toggleAddressForm}
          >
            Add new address
          </div>
        </div>
        <div className="row">
          {_map(addresses, (addr) => (
            <div className="col-12 my-2">
              <AddressCard
                address={addr}
                onEdit={this.onClickEdit}
                onDelete={this.onClickDelete}
                onSelect={this.onAddressSelect}
              />
            </div>
          ))}
        </div>
        {showForm && (
          <div className="row m-5">
            <h2>{isEdit ? "Edit Address" : "Add new Address"}</h2>
            <AddressForm
              address={addressToBeEdited}
              onSubmit={this.onSaveAddress}
              isEdit={isEdit}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect((s) => ({ addresses: s.user.addresses }), {
  push,
  saveAddress,
  updateAddress,
  deleteAddress,
  saveCheckoutData,
})(DeliveryPage);
