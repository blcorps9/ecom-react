/* eslint-disable comma-dangle */
import React from "react";

import BtnWrapper from "./BtnWrapper";
import Button from "./Button";
import H1 from "./H1";

export default function Row({ cntr, onDec, onInc }) {
  return (
    <div className="row">
      <H1 label={cntr} />
      <BtnWrapper>
        <Button label="Inc" onClick={onInc} classes="btn btn-primary" />
      </BtnWrapper>
      <BtnWrapper>
        <Button label="Dec" onClick={onDec} classes="btn btn-secondary" />
      </BtnWrapper>
    </div>
  );
}
