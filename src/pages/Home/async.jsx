import React, { Component } from "react";

export default class HomeAsync extends Component {
  state = { Comp: null };

  componentDidMount() {
    import("./index").then((c) => {
      this.setState({ Comp: c.default });
    });
  }

  render() {
    const { Comp } = this.state;

    if (Comp) return <Comp />;

    return null;
  }
}
