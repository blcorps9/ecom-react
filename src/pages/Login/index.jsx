import React, { Component } from "react";
import _get from "lodash/get";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginForm from "../../components/LoginForm";

import { doLogin } from "../../store/actions/user";

class LoginPage extends Component {
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

    this.props.doLogin(formData);
  };

  render() {
    const { isLoggedIn } = this.props;
    const { errorMessage } = this.state;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

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

export default connect((s) => ({ isLoggedIn: s.user.isLoggedIn }), { doLogin })(
  LoginPage
);
