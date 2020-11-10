import React, { Component } from "react";
import _get from "lodash/get";

import RegistrationForm from "../../components/RegistrationForm";

import { makeRequest } from "../../utils";

export default class RegistrationPage extends Component {
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

    makeRequest("/api/auth/register", { method: "POST", data: formData })
      .then(async (r) => {
        if (r.status === 201) {
          const redirectTo = _get(
            this.props,
            ["history", "location", "search"],
            "?redirectTo=/"
          );

          const urlParams = new URLSearchParams(redirectTo);

          this.props.history.push(urlParams.get("redirectTo"));
        } else {
          const { message } = await r.json();
          this.setState({ errorMessage: message });
        }
      })
      .catch((e) => {
        this.setState({ errorMessage: e.message });
      });
  };

  render() {
    const { errorMessage } = this.state;

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
