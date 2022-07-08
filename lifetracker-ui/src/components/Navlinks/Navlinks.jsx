import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import "./Navlinks.css";

export default function Navlinks() {
  const { authed, logoutUser } = useAuthContext();

  return (
    <ul className="links">
      <li>
        <Link to={authed ? "/activity" : "/forbidden"}>Activity</Link>
      </li>
      <li>
        <Link to={authed ? "/excercise" : "/forbidden"}>Exercise</Link>
      </li>
      <li>
        <Link to={authed ? "/nutrition" : "/forbidden"}>Nutrition</Link>
      </li>
      <li>
        <Link to={authed ? "/sleep" : "/forbidden"}>Sleep</Link>
      </li>
      {authed ? (
        <li className="signout-button">
          <Link to="/" onClick={logoutUser}>
            Sign Out
          </Link>
        </li>
      ) : (
        <div className="notlogged">
          <li className="login-button">
            <Link to="/login">Login</Link>
          </li>
          <li className="btn secondary">
            <Link to="/register">Sign Up</Link>
          </li>
        </div>
      )}
    </ul>
  );
}
