import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./RegistrationForm";

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        location: form.location,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      if (res?.data?.user) {
        setAppState(res.data);
        setIsLoading(false);
        //navigate("/portal")
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
        <div class="input-field">
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
        <div class="input-field">
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
        <div class="split-input-field">
          <div class="input-field">
            <label>First Name</label>
            <input
              className="form-input"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleOnInputChange}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <div class="input-field">
            <label>Last Name</label>
            <input
              className="form-input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleOnInputChange}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
        </div>
        <div class="input-field">
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
        <div class="input-field">
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
