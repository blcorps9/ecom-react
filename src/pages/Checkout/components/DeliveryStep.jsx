import React from "react";

export default function DeliveryStep({ onSubmit, disable }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-4 mb-3">
          <label htmlFor="firstName">First name</label>
          <input
            required
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            defaultValue="Saint"
          />
        </div>
        <div className="col-4 mb-3">
          <label htmlFor="lastName">Last name</label>
          <input
            required
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            defaultValue="Walker"
          />
        </div>
        <div className="col-4 mb-3">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            required
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            placeholder="9123456789"
            defaultValue="9123456789"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-3">
          <label htmlFor="line1">Address</label>
          <input
            required
            id="line1"
            name="line1"
            type="text"
            className="form-control"
            placeholder="1234 Main St"
            defaultValue="1234 Main St"
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="line2">
            Address 2 <span className="text-muted">(Optional)</span>
          </label>
          <input
            id="line2"
            type="text"
            name="line2"
            className="form-control"
            placeholder="Apartment or suite"
            defaultValue="Apartment or suite"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4 mb-3">
          <label htmlFor="city">City</label>
          <input
            required
            id="city"
            type="text"
            name="city"
            placeholder="Bangalore"
            defaultValue="Bangalore"
            className="form-control"
          />
        </div>
        <div className="col-4 mb-3">
          <label htmlFor="state">State</label>
          <select
            required
            id="state"
            name="state"
            defaultValue="KN"
            className="custom-select d-block w-100"
          >
            <option>Choose...</option>
            <option value="KN">Karnataka</option>
          </select>
        </div>
        <div className="col-4 mb-3">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            required
            type="text"
            id="postalCode"
            name="postalCode"
            defaultValue="560001"
            className="form-control"
          />
        </div>
      </div>

      {!disable && (
        <button type="submit" className="btn btn-primary btn-block">
          Save Address
        </button>
      )}
    </form>
  );
}
