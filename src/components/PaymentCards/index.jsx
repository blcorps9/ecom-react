import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PaymentCards({ cards = [] }) {
  return (
    <div className="payment-options">
      {cards.map(({ icon, id, size, title }) => (
        <FontAwesomeIcon
          key={id}
          icon={icon}
          size={size}
          className="payment-opts"
        />
      ))}
    </div>
  );
}
