import React, { useContext } from "react";
import { useState } from "react";
import { useAuthContext } from "../../contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import ApiClient from "../../services/apiClient"

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { error, setError, loginUser } = useAuthContext();
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

    const { data, error } = await ApiClient.login(form);
    if (error) {
      setError((e) => ({ ...e, form: error }));
      setIsLoading(false);
    } else if (data?.user) {
      loginUser(data.user);
      ApiClient.setToken(data.token);
      navigate("/activity");
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="header">
        <h2>Login</h2>
      </div>
      {error?.form && (<span className="error">{error.form}</span>)}
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
          {error?.email && (<span className="error">{error.email}</span>)}
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
          {error?.password && (<span className="error">{error.password}</span>)}
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
