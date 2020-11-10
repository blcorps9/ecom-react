import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Hr from "../Hr";

export default function RegistrationForm({ onSubmit, errorMessage }) {
  return (
    <form className="form-registration" onSubmit={onSubmit}>
      <div className="form-row justify-content-center">
        <div className="col-4">
          <div className="avatar-container">
            <FontAwesomeIcon
              size="10x"
              icon={{ prefix: "fas", iconName: "user-circle" }}
            />
            {/* <input type="file" name="avatar" id="avatar" /> */}
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-12">
          <label htmlFor="fullName">Full Name</label>
          <input
            required
            type="text"
            name="name"
            id="fullName"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-12">
          <label htmlFor="email">Email</label>
          <input
            required
            id="email"
            name="email"
            type="email"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label htmlFor="password">Password</label>
          <input
            required
            minLength="6"
            id="password"
            name="password"
            type="password"
            className="form-control"
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            required
            minLength="6"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-4">
          <label htmlFor="role">Role</label>
          <select required id="role" className="form-control" name="role">
            <option value="">Choose...</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary w-100">
          Sign Up
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
          <Link to="/login" className="form-control btn btn-primary">
            Already a user? Click here to Login.
          </Link>
        </div>
      </div>
    </form>
  );
}
