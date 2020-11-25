import React from "react";
import _compact from "lodash/compact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddressCard({ address, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <span>{address.line1}</span>
        <span>
          <span
            onClick={onEdit}
            data-value={address.id}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={{ prefix: "far", iconName: "edit" }} />
          </span>
          &nbsp;&nbsp;&nbsp;
          <span
            onClick={onDelete}
            data-value={address.id}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={{ prefix: "far", iconName: "trash-alt" }} />
          </span>
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          {address.fullName} - {address.contactNo}
        </h5>
        <p className="card-text">
          {_compact([address.line1, address.line2, address.street]).join(", ")}
        </p>
        <p className="card-text">
          {_compact([address.city, address.state, address.postalCode]).join(
            ", "
          )}
        </p>
        <a href="#" className="btn btn-primary">
          Deliver to this address
        </a>
      </div>
    </div>
  );
}
