import React, { Component } from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Accordion extends Component {
  state = {
    openKey: "",
  };

  toggleCell = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const id = e.currentTarget.getAttribute("data-id");

    this.setState((pS) => {
      if (pS.openKey === id) {
        return { openKey: "" };
      }

      return { openKey: id };
    });
  };

  render() {
    const { openKey } = this.state;
    const cells = this.props.cells;

    return (
      <div className="accordion">
        {cells.map((cell) => {
          const isOpen = openKey === cell.id;

          return (
            <div
              className="card"
              key={cell.id}
              data-id={cell.id}
              onClick={this.toggleCell}
            >
              <div className="card-header p-1">
                <h2 className="mb-0">
                  <div className="btn btn-block text-left" type="button">
                    {cell.header}
                  </div>
                </h2>
                <FontAwesomeIcon
                  icon={{
                    prefix: "fas",
                    iconName: isOpen ? "chevron-up" : "chevron-down",
                  }}
                />
              </div>

              <div
                className={cx("collapse", {
                  show: isOpen,
                })}
              >
                <div className="card-body p-0">{cell.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
