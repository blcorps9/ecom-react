import React, { Component } from "react";

import Routes from "./Routes";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";

const AppBody = () => {
  return (
    <div className="app-body" style={{ height: "auto", width: "100%" }}>
      <Routes />
    </div>
  );
};

class App extends Component {
  state = {
    showSpinner: false,
  };

  onShowSpinner = () => {
    this.setState({ showSpinner: true });
  };

  onHideSpinner = () => {
    this.setState({ showSpinner: false });
  };

  render() {
    const { showSpinner } = this.state;

    return (
      <div className="main-container">
        <Header />
        <AppBody />
        <Footer />
        <Spinner show={showSpinner} />
      </div>
    );
  }
}

export default App;
