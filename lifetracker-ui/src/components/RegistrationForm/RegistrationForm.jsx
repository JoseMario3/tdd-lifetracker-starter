import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./RegistrationForm";

export default function RegistrationForm(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
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
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (
        (event.target.value.indexOf("@") === -1 && event.target.value !== "") ||
        event.target.value.indexOf("@") === 0
      ) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "username") {
      if (event.target.value !== "") {
        setErrors((e) => ({ ...e, username: null }));
      }
    }

    if (event.target.name === "first_name") {
      if (event.target.value !== "") {
        setErrors((e) => ({ ...e, first_name: null }));
      }
    }

    if (event.target.name === "last_name") {
      if (event.target.value !== "") {
        setErrors((e) => ({ ...e, last_name: null }));
      }
    }

    if (event.target.name === "password") {
      if (event.target.value !== "") {
        setErrors((e) => ({ ...e, password: null }));
      }
    }

    if (event.target.name === "confirmPassword") {
      if (event.target.value !== "") {
        setErrors((e) => ({ ...e, confirmPassword: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.email === "") {
      setErrors((e) => ({ ...e, email: "Please enter an email" }));
      setIsLoading(false);
      return;
    }

    if (form.username === "") {
      setErrors((e) => ({ ...e, username: "Please enter a username" }));
      setIsLoading(false);
      return;
    }

    if (form.first_name === "") {
      setErrors((e) => ({
        ...e,
        first_name: "Please enter your first name",
      }));
      setIsLoading(false);
      return;
    }

    if (form.last_name === "") {
      setErrors((e) => ({ ...e, last_name: "Please enter your last name" }));
      setIsLoading(false);
      return;
    }

    if (form.password === "") {
      setErrors((e) => ({ ...e, password: "Please enter a password" }));
      setIsLoading(false);
      return;
    }

    if (form.confirmPassword === "") {
      setErrors((e) => ({
        ...e,
        confirmPassword: "Please confirm your password",
      }));
      setIsLoading(false);
      return;
    }

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        username: form.username,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      });

      if (res?.data?.user) {
        props.setAppState(res.data);
        props.setLoggedIn(true);
        setIsLoading(false);
        navigate("/");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with registration",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
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
          {errors.email && <span className="error">{errors.email}</span>}
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
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="split-input-field">
          <div className="input-field">
            <label>First Name</label>
            <input
              className="form-input"
              type="text"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleOnInputChange}
            />
            {errors.first_name && (
              <span className="error">{errors.first_name}</span>
            )}
          </div>
          <div className="input-field">
            <label>Last Name</label>
            <input
              className="form-input"
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleOnInputChange}
            />
            {errors.last_name && (
              <span className="error">{errors.last_name}</span>
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
          {errors.password && <span className="error">{errors.password}</span>}
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
          {errors.passwordConfirm && (
            <span className="error">{errors.passwordConfirm}</span>
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
