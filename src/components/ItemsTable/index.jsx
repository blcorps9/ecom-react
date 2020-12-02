import React from "react";
import _map from "lodash/map";
import _find from "lodash/find";

import { formatPrice } from "../../utils";

export default function ItemsTable({ items, noAction, actionLabel, onAction }) {
  const tabHeader = ["#", "Name", "Brand", "Quantity", "Price"];
  const hasSize = !!_find(items, (i) => i.size);
  const hasColor = !!_find(items, (i) => i.color);

  if (hasSize) tabHeader.push("Size");
  if (hasColor) tabHeader.push("Color");

  if (!noAction) tabHeader.push("Action");

  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          {_map(tabHeader, (h, index) => (
            <th key={index} scope="col">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {_map(items, (i, index) => (
          <tr key={i.id}>
            <th scope="row">{index + 1}</th>
            <td>{i.name}</td>
            <td>{i.brand}</td>
            <td>{i.quantity}</td>
            <td>{formatPrice(i.price)}</td>
            {hasSize && <td>{i.size}</td>}
            {hasColor && <td>{i.color}</td>}
            {!noAction && (
              <td>
                <span
                  data-value={i.id}
                  onClick={onAction}
                  className="btn btn-primary"
                >
                  {actionLabel}
                </span>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
