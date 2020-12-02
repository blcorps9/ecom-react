import React from "react";
import { connect } from "react-redux";

import Hr from "../../components/Hr";
import { MONTHS_SHORT } from "../../config";
import { formatPrice } from "../../utils";

function ConfirmationPage({ lastOrder }) {
  if (lastOrder && lastOrder.items) {
    const { deliveryDate } = lastOrder;
    const date = new Date(deliveryDate);
    const strDate = `${
      MONTHS_SHORT[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;

    return (
      <div className="confirmation-page">
        <div className="row p-5">
          <div className="text-center col-12">
            <h2 className="text-success">Thank you for ordering with us!</h2>

            <h4 className="text-info">
              Your order will be delivered to you on or before{" "}
              <strong>{strDate}</strong>
            </h4>
          </div>
        </div>
        <div className="row">
          <Hr />
        </div>
        <div className="row p-5 text-center">
          <div className="col-12">OrderId: {lastOrder.id}</div>
          <div className="col-12">
            Order Total: {formatPrice(lastOrder.total)}
          </div>
          <div className="col-12">
            {lastOrder.items.map((item) => {
              return <div key={item.id}>{item.id}</div>;
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default connect((s) => ({ lastOrder: s.user.lastOrder }))(
  ConfirmationPage
);
