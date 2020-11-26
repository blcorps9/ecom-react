import React, { Component } from "react";
import cx from "classnames";
import _map from "lodash/map";

export default class CheckoutSteps extends Component {
  onSelectStep = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const step = Number(e.currentTarget.getAttribute("data-step"));

    if (!isNaN(step)) this.props.onSelectStep(step);
  };

  cancelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { steps, currentStep } = this.props;

    return (
      <div className="checkout-steps">
        {_map(steps, (s, index) => {
          const isPrev = index < currentStep;
          const isCurrent = index === currentStep;
          const isNext = index > currentStep;
          const onClick = isPrev ? this.onSelectStep : this.cancelClick;

          return (
            <div
              className={cx("step", {
                prev: isPrev,
                current: isCurrent,
                next: isNext,
              })}
              key={s.id}
              data-step={index}
              onClick={onClick}
            >
              <div className="step-circle">{s.id}</div>
              <div className="step-label">{s.label}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
