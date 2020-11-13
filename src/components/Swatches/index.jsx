import React from "react";
import cx from "classnames";

export default function Swatches({ heading, items, type, onClick }) {
  return (
    <div className="row colors swatches my-2">
      <div className="col-12">{heading}</div>
      <div className="col-12">
        {items.map((item, i) => {
          const style = type === "color" ? { backgroundColor: item.value } : {};
          const val = type === "color" ? "" : item.value;

          return (
            <div
              key={i}
              onClick={onClick}
              data-value={item.value}
              className={cx("swatch", type, { selected: item.isSelected })}
            >
              <div style={style}>{val}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
