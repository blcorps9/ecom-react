import React, { Component } from "react";
import _get from "lodash/get";

import Routes from "./Routes";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";

class App extends Component {
  state = {
    user: "",
    showSpinner: false,
  };

  onShowSpinner = () => {
    this.setState({ showSpinner: true });
  };

  onHideSpinner = () => {
    this.setState({ showSpinner: false });
  };

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { showSpinner, user } = this.state;

    return (
      <div className="main-container">
        <Header userName={_get(user, ["name"], "")} />
        <div className="app-body" style={{ height: "auto", width: "100%" }}>
          <Routes setUser={this.setUser} user={user} />
        </div>
        <Footer />
        <Spinner show={showSpinner} />
      </div>
    );
  }
}

export default App;
