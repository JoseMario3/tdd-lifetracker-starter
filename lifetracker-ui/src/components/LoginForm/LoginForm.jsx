import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../../contexts/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { error, setError, loginUser, setLoggedIn } = useContext(AuthContext);
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
        setError((e) => ({ ...e, email: "Please enter a valid email" }));
      } else {
        setError((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "password") {
      if (event.target.value !== "") {
        setError((e) => ({ ...e, password: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError((e) => ({ ...e, form: null }));

    if (form.email === "") {
      setError((e) => ({ ...e, email: "Please enter an email" }));
      setIsLoading(false);
      return;
    }

    if (form.password === "") {
      setError((e) => ({ ...e, password: "Please enter a password" }));
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/auth/login`,
        form
      );
      if (response?.data) {
        loginUser(response.data);
        setIsLoading(false);
        navigate("/activity");
      } else {
        setError((e) => ({
          ...e,
          form: "Invalid username/password combination",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setError((e) => ({
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
          {error.email && <span className="error">{error.email}</span>}
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
          {error.password && <span className="error">{error.password}</span>}
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
