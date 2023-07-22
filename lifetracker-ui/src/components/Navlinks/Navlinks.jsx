import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import "./Navlinks.css";

export default function Navlinks() {
  const { authStates, authFunctions } = useAuthContext();

  return (
    <ul className="links">
      <li>
        <Link to={authStates.authed ? "/activity" : "/forbidden"}>Activity</Link>
      </li>
      <li>
        <Link to={authStates.authed ? "/excercise" : "/forbidden"}>Exercise</Link>
      </li>
      <li>
        <Link to={authStates.authed ? "/nutrition" : "/forbidden"}>Nutrition</Link>
      </li>
      <li>
        <Link to={authStates.authed ? "/sleep" : "/forbidden"}>Sleep</Link>
      </li>
      {authStates.authed ? (
        <li className="signout-button">
          <Link to="/" onClick={authFunctions.logoutUser}>
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
