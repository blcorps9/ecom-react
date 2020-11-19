import React, { Component } from "react";
import _get from "lodash/get";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import RegistrationForm from "../../components/RegistrationForm";

import { doRegistration } from "../../store/actions/user";

class RegistrationPage extends Component {
  state = {
    errorMessage: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = {};

    for (let f of e.target) {
      if (f.type !== "submit" && f.type !== "button") {
        formData[f.name] = f.value;
      }
    }

    // TODO: Replace with actual image
    formData.avatar = "/images/profile/avatar.png";

    const redirectTo =
      _get(this.props, ["history", "location", "search"], "") ||
      "?redirectTo=/";

    const urlParams = new URLSearchParams(redirectTo);

    this.props.doRegistration(formData, urlParams.get("redirectTo") || "/");
  };

  render() {
    const { errorMessage } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="page registration-page p-4">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="row">
              <p className="h4">Register</p>
            </div>
            <div className="row">
              <div className="col-12">
                <RegistrationForm
                  onSubmit={this.onSubmit}
                  errorMessage={errorMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { doRegistration })(RegistrationPage);
