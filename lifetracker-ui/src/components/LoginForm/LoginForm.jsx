import * as React from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="card">
      <h2>Login</h2>
      <span className="error">You must be logged in to access that page</span>
      <div className="form">
        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="user@gmail.com"
            value
          ></input>
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value
          ></input>
        </div>
        <button className="btn">Login</button>
      </div>
      <div className="footer">
        <p>Don't have an account? Sign up </p>
        <Link to="/register"> here.</Link>
      </div>
    </div>
  );
}
