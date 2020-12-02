import React, { Component } from "react";
import cx from "classnames";
import _range from "lodash/range";

export default class Pagination extends Component {
  onClickNext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { config } = this.props;

    this.props.onChange({ ...config, currentPage: config.currentPage + 1 });
  };

  onClickPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { config } = this.props;

    this.props.onChange({ ...config, currentPage: config.currentPage - 1 });
  };

  onClickPage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { config } = this.props;
    const currentPage = Number(e.currentTarget.getAttribute("data-pg"));

    this.props.onChange({ ...config, currentPage });
  };

  onChangeItemsPerPage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { config } = this.props;
    const itemsPerPage = Number(e.target.value);

    this.props.onChange({ ...config, itemsPerPage });
  };

  render() {
    const { config, classes } = this.props;
    const { currentPage, totalPages, itemsPerPage } = config;

    return (
      <nav class={cx(classes)} style={{ height: 60 }}>
        <label htmlFor="items-per-page">
          Items Per Page:
          <select
            name="items-per-page"
            defaultValue={itemsPerPage}
            onChange={this.onChangeItemsPerPage}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <ul className="pagination justify-content-end">
          <li className={cx("page-item", { disabled: currentPage === 0 })}>
            <span className="page-link" onClick={this.onClickPrev}>
              Previous
            </span>
          </li>
          {_range(0, totalPages).map((p) => (
            <li
              className={cx("page-item", { active: currentPage === p })}
              key={p}
            >
              <span
                data-pg={p}
                className="page-link"
                onClick={this.onClickPage}
              >
                {p + 1}
              </span>
            </li>
          ))}
          <li
            className={cx("page-item", {
              disabled: currentPage === totalPages - 1,
            })}
          >
            <span className="page-link" onClick={this.onClickNext}>
              Next
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}
