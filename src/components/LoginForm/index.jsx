import React from "react";
import { Link } from "react-router-dom";

import Hr from "../Hr";

export default function LoginForm({ onSubmit, errorMessage }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="username">Email address</label>
        <input
          type="email"
          id="username"
          name="username"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </div>
      {errorMessage && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        </div>
      )}

      <Hr />
      <div className="form-row justify-content-center mt-4">
        <div className="form-group col-6">
          <Link to="/register" className="form-control btn btn-primary">
            Not a user? Click here to Register.
          </Link>
        </div>
      </div>
    </form>
  );
}
