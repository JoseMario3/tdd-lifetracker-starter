import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import apiClient from "./../../services/apiClient";
import "./RegistrationForm";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { authStates, authFunctions } = useAuthContext();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        (e) => ({
          ...e,
          passwordConfirm: "Passwords do not match",
        });
      } else {
        authStates.setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        authStates.setError((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match",
        }));
      } else {
        authStates.setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (
        (event.target.value.indexOf("@") === -1 && event.target.value !== "") ||
        event.target.value.indexOf("@") === 0
      ) {
        authStates.setError((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        authStates.setError((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "username") {
      if (event.target.value !== "") {
        authStates.setError((e) => ({ ...e, username: null }));
      }
    }

    if (event.target.name === "firstName") {
      if (event.target.value !== "") {
        authStates.setError((e) => ({ ...e, first_name: null }));
      }
    }

    if (event.target.name === "lastName") {
      if (event.target.value !== "") {
        authStates.setError((e) => ({ ...e, last_name: null }));
      }
    }

    if (event.target.name === "password") {
      if (event.target.value !== "") {
        authStates.setError((e) => ({ ...e, password: null }));
      }
    }

    if (event.target.name === "confirmPassword") {
      if (event.target.value !== "") {
        authStates.setError((e) => ({ ...e, confirmPassword: null }));
      }
    }
    if (event.target.name === "firstName") {
      setForm((f) => ({ ...f, first_name: event.target.value }));
    } else if (event.target.name == "lastName") {
      setForm((f) => ({ ...f, last_name: event.target.value }));
    } else {
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }

  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    authStates.setError((e) => ({ ...e, form: null }));

    if (form.email === "") {
      authStates.setError((e) => ({ ...e, email: "Please enter an email" }));
      setIsLoading(false);
      return;
    }

    if (form.username === "") {
      authStates.setError((e) => ({ ...e, username: "Please enter a username" }));
      setIsLoading(false);
      return;
    }

    if (form.first_name === "") {
      authStates.setError((e) => ({
        ...e,
        first_name: "Please enter your first name",
      }));
      setIsLoading(false);
      return;
    }

    if (form.last_name === "") {
      authStates.setError((e) => ({ ...e, last_name: "Please enter your last name" }));
      setIsLoading(false);
      return;
    }

    if (form.password === "") {
      authStates.setError((e) => ({ ...e, password: "Please enter a password" }));
      setIsLoading(false);
      return;
    }

    if (form.confirmPassword === "") {
      authStates.setError((e) => ({
        ...e,
        confirmPassword: "Please confirm your password",
      }));
      setIsLoading(false);
      return;
    }

    if (form.passwordConfirm !== form.password) {
      authStates.setError((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      authStates.setError((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signup(form);
    if (error) {
      authStates.setError((e) => ({ ...e, form: error }));
      setIsLoading(false);
    } else if (data?.user) {
      authFunctions.signupUser(data.user);
      apiClient.setToken(data.token);
      navigate("/");
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      {authStates.error?.form && (<span className="error">{authStates.error.form}</span>)}
      <div className="form">
        <div className="input-field">
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter a valid email"
            value={form.email}
            onChange={handleOnInputChange}
          />
          {authStates.error.email && <span className="error">{authStates.error.email}</span>}
        </div>
        <div className="input-field">
          <label>Username</label>
          <input
            className="form-input"
            type="username"
            name="username"
            placeholder="your_username"
            value={form.username}
            onChange={handleOnInputChange}
          />
          {authStates.error.username && <span className="error">{authStates.error.username}</span>}
        </div>
        <div className="split-input-field">
          <div className="input-field">
            <label>First Name</label>
            <input
              className="form-input"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleOnInputChange}
            />
            {authStates.error.first_name && (
              <span className="error">{authStates.error.first_name}</span>
            )}
          </div>
          <div className="input-field">
            <label>Last Name</label>
            <input
              className="form-input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleOnInputChange}
            />
            {authStates.error.last_name && (
              <span className="error">{authStates.error.last_name}</span>
            )}
          </div>
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter a secure password"
            value={form.password}
            onChange={handleOnInputChange}
          />
          {authStates.error.password && <span className="error">{authStates.error.password}</span>}
        </div>
        <div className="input-field">
          <label>Confirm Password</label>
          <input
            className="form-input"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm your password"
            value={form.passwordConfirm}
            onChange={handleOnInputChange}
          />
          {authStates.error.passwordConfirm && (
            <span className="error">{authStates.error.passwordConfirm}</span>
          )}
        </div>
        <button className="submit-registration" onClick={handleOnSubmit}>
          {isLoading ? "Loading..." : "Create Account"}
        </button>
      </div>
      <div className="footer">
        <p>
          Already have an account?
          <Link to="/login"> Login here</Link>
        </p>
      </div>
    </div>
  );
}
