import * as React from "react";
import { Link } from "react-router-dom";
import "./RegistrationForm";

export default function RegistrationForm() {
  return (
    <div className="card">
      <h2>Register</h2>
      <div className="form">
        <div class="input-field">
          <label for="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter a valid email"
            value=""
          />
        </div>
        <div class="input-field">
          <label for="username">Username</label>
          <input
            className="form-input"
            type="username"
            name="username"
            placeholder="your_username"
            value=""
          />
        </div>
        <div class="split-input-field">
          <div class="input-field">
            <label>First Name</label>
            <input
              className="form-input"
              type="text"
              name="firstName"
              placeholder="First Name"
              value=""
            />
          </div>
          <div class="input-field">
            <label>Last Name</label>
            <input
              className="form-input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value=""
            />
          </div>
        </div>
        <div class="input-field">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter a secure password"
            value=""
          />
        </div>
        <div class="input-field">
          <label>Confirm Password</label>
          <input
            className="form-input"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm your password"
            value=""
          />
        </div>
        <button className="submit-registration">Create Account</button>
      </div>
      <div className="footer">
        <p>
          Already have an account? Login
          <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}
