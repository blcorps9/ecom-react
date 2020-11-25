import React from "react";
import _map from "lodash/map";

export default function AddressForm({
  isEdit,
  address,
  onSubmit,
  states = [{ value: "KN", label: "Karnataka" }],
}) {
  return (
    <form className="address-form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            required
            defaultValue={isEdit ? address.firstName : ""}
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
            defaultValue={isEdit ? address.lastName : ""}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="contactNo">Contact No</label>
        <input
          type="text"
          className="form-control"
          id="contactNo"
          name="contactNo"
          placeholder="9123456789"
          required
          defaultValue={isEdit ? address.contactNo : ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="line1">Address Ln 1</label>
        <input
          type="text"
          className="form-control"
          id="line1"
          name="line1"
          placeholder="1234 Main St"
          required
          defaultValue={isEdit ? address.line1 : ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="line2">Address Ln 2</label>
        <input
          type="text"
          className="form-control"
          id="line2"
          name="line2"
          placeholder="Apartment, studio, or floor"
          defaultValue={isEdit ? address.line2 : ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          className="form-control"
          id="street"
          name="street"
          placeholder="M G Road"
          defaultValue={isEdit ? address.street : ""}
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            required
            defaultValue={isEdit ? address.city : ""}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="state">State</label>
          <select id="state" className="form-control" name="state" required>
            <option selected>Choose state...</option>
            {_map(states, (s, index) => (
              <option value={s.value} key={index}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            name="postalCode"
            required
            defaultValue={isEdit ? address.postalCode : ""}
          />
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
