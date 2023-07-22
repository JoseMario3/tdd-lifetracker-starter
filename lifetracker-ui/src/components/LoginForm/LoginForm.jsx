import React, { useContext } from "react";
import { useState } from "react";
import { useAuthContext } from "../../contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import ApiClient from "../../services/apiClient"

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { authStates, authFunctions } = useAuthContext();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (
        (event.target.value.indexOf("@") === -1 && event.target.value !== "") ||
        event.target.value.indexOf("@") === 0
      ) {
        authStates.setError((e) => ({ ...e, email: "Please enter a valid email" }));
      } else {
        authStates.setError((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "password") {
      if (event.target.value !== "") {
        authStates.setError((e) => ({ ...e, password: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    authStates.setError((e) => ({ ...e, form: null }));

    if (form.email === "") {
      authStates.setError((e) => ({ ...e, email: "Please enter an email" }));
      setIsLoading(false);
      return;
    }

    if (form.password === "") {
      authStates.setError((e) => ({ ...e, password: "Please enter a password" }));
      setIsLoading(false);
      return;
    }

    const { data, error } = await ApiClient.login(form);
    if (error) {
      authStates.setError((e) => ({ ...e, form: error }));
      setIsLoading(false);
    } else if (data?.user) {
      authFunctions.loginUser(data.user);
      ApiClient.setToken(data.token);
      setForm((f) => ({}));
      navigate("/activity");
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="header">
        <h2>Login</h2>
      </div>
      {authStates.error?.form && (<span className="error">{authStates.error.form}</span>)}
      <div className="form">
        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="user@gmail.com"
            onChange={handleOnInputChange}
            value={form.email}
          />
          {authStates.error?.email && (<span className="error">{authStates.error.email}</span>)}
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleOnInputChange}
            value={form.password}
          />
          {authStates.error?.password && (<span className="error">{authStates.error.password}</span>)}
        </div>
        <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
          {" "}
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
      <div className="footer">
        <p>
          Don't have an account? Sign up
          <Link to="/register"> here.</Link>
        </p>
      </div>
    </div>
  );
}
