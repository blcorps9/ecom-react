import React, { Component } from "react";
import _get from "lodash/get";

import LoginForm from "../../components/LoginForm";

import { makeRequest } from "../../utils";

export default class LoginPage extends Component {
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

    makeRequest("/api/auth/login", { method: "POST", data: formData })
      .then(async (r) => {
        if (r.status === 200) {
          const redirectTo =
            _get(this.props, ["history", "location", "search"], "") ||
            "?redirectTo=/";

          const user = await r.json();

          this.props.setUser(user.data);

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
      <div className="page login-page p-4">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="row">
              <p className="h4">Login</p>
            </div>
            <div className="row">
              <div className="col-12">
                <LoginForm
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
