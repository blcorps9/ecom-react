import React, { Component } from "react";
import _get from "lodash/get";
import { connect } from "react-redux";

import Routes from "./Routes";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";

import { getDashboard } from "./store/actions/user";

class App extends Component {
  state = {
    showSpinner: false,
  };

  componentDidMount() {
    this.props.getDashboard();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.getDashboard();
    }
  }

  onShowSpinner = () => {
    this.setState({ showSpinner: true });
  };

  onHideSpinner = () => {
    this.setState({ showSpinner: false });
  };

  render() {
    const { showSpinner } = this.state;
    const { user, isLoggedIn } = this.props;

    return (
      <div className="main-container">
        <Header
          cartCount={user.cartCount}
          userName={_get(user, ["profile", "name"], "")}
        />
        <div className="app-body" style={{ height: "auto", width: "100%" }}>
          <Routes user={user.profile} isLoggedIn={isLoggedIn} />
        </div>
        <Footer />
        <Spinner show={showSpinner} />
      </div>
    );
  }
}

export default connect(
  (s) => ({ user: s.user, isLoggedIn: s.user.isLoggedIn }),
  {
    getDashboard,
  }
)(App);
