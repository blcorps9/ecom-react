import React from "react";
import _compact from "lodash/compact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function someMagic(num) {
  // do somehitng

  return num;
}

export default function CardCard({ card, onEdit, onDelete, onSelect }) {
  return (
    <div className="card">
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
            <FontAwesomeIcon icon={{ prefix: "far", iconName: "trash-alt" }} />
          </span>
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          {card.holderName} - {someMagic(card.cardNumber)}
        </h5>
        <div
          onClick={onSelect}
          data-value={card.id}
          className="btn btn-seconday"
          style={{ cursor: "not-allowed" }}
        >
          Pay with this card
        </div>
      </div>
    </div>
  );
}
