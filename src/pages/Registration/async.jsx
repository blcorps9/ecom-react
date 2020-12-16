import React, { Component } from "react";

export default class RegisterAsync extends Component {
  state = { Comp: null };

  componentDidMount() {
    import("./index").then((c) => this.setState({ Comp: c.default }));
  }

  render() {
    const { Comp } = this.state;

    if (Comp) return <Comp />;

    return null;
  }
}
