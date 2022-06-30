import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (
        (event.target.value.indexOf("@") === -1 && event.target.value !== "") ||
        event.target.value.indexOf("@") === 0
      ) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email" }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "password") {
      if (event.target.value !== "") {
        setErrors((e) => ({ ...e, password: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.email === "") {
      setErrors((e) => ({ ...e, email: "Please enter an email" }));
      setIsLoading(false);
      return;
    }

    if (form.password === "") {
      setErrors((e) => ({ ...e, password: "Please enter a password" }));
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/auth/login`,
        form
      );
      if (response?.data) {
        props.setAppState(response.data);
        props.setLoggedIn(true);
        setIsLoading(false);
        navigate("/activity");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Invalid username/password combination",
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
      <div className="header">
        <h2>Login</h2>
      </div>
      {/*<span className="error">You must be logged in to access that page</span>*/}
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
          {errors.email && <span className="error">{errors.email}</span>}
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
          {errors.password && <span className="error">{errors.password}</span>}
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
