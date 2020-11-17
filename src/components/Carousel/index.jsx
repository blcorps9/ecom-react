import React, { Component } from "react";
import cx from "classnames";
import _map from "lodash/map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
      totalSlides: props.slides.length,
    };

    this.timer = null;
  }

  componentDidMount() {
    const { delay, auto } = this.props;

    if (auto) this.timer = setInterval(this.showNextSlide, delay);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  onClickPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((pS) => ({
      currentSlide: (pS.currentSlide - 1 + pS.totalSlides) % pS.totalSlides,
    }));
  };

  onClickNext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.showNextSlide();
  };

  showNextSlide = () => {
    this.setState((pS) => ({
      currentSlide: (pS.currentSlide + 1) % pS.totalSlides,
    }));
  };

  render() {
    const { currentSlide } = this.state;
    const { slides } = this.props;

    return (
      <section className="carousel-container">
        <div className="slides">
          {_map(slides, (s, i) => (
            <div
              style={{ background: `${s.bg}` }}
              className={cx("slide", { current: i === currentSlide })}
            />
          ))}
        </div>
        <div className="action prev" onClick={this.onClickPrev}>
          <FontAwesomeIcon
            icon={{
              prefix: "fas",
              iconName: "chevron-left",
            }}
          />
        </div>
        <div className="action next" onClick={this.onClickNext}>
          <FontAwesomeIcon
            icon={{
              prefix: "fas",
              iconName: "chevron-right",
            }}
          />
        </div>
      </section>
    );
  }
}
