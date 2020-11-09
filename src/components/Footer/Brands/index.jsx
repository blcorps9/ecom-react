import React from "react";

export default function Brands({ brands }) {
  return (
    <div className="site-brands">
      {brands.map((b) => (
        <span className="brand" key={b.id}>
          {b.name}
        </span>
      ))}
    </div>
  );
}
