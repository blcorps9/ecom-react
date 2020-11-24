import React, { Component } from "react";
import cx from "classnames";

export default class Dropdown extends Component {
  state = {
    isOpen: false,
  };

  toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((pS) => ({ isOpen: !pS.isOpen }));
  };

  onSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const val = e.currentTarget.getAttribute("data-value");

    this.setState({ isOpen: false }, () => this.props.onSelect(val));
  };

  render() {
    const { label, options, styles = {} } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="btn-group" onClick={this.toggle}>
        <button
          type="button"
          className="btn btn-secondary btn-sm dropdown-toggle"
        >
          {label}
        </button>
        <div className={cx("dropdown-menu", { show: isOpen })} style={styles}>
          {options.map((o) => (
            <span
              class="dropdown-item"
              data-value={o.value}
              onClick={this.onSelect}
            >
              {o.label}
            </span>
          ))}
        </div>
      </div>
    );
  }
}
