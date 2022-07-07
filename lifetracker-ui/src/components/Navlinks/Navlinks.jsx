import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import "./Navlinks.css";

export default function Navlinks() {
  const { loggedIn, logoutUser } = useAuthContext();

  return (
    <ul className="links">
      <li>
        <Link to={loggedIn ? "/activity" : "/login"}>Activity</Link>
      </li>
      <li>
        <Link to={loggedIn ? "/excercise" : "/login"}>Exercise</Link>
      </li>
      <li>
        <Link to={loggedIn ? "/nutrition" : "/login"}>Nutrition</Link>
      </li>
      <li>
        <Link to={loggedIn ? "/sleep" : "/login"}>Sleep</Link>
      </li>
      {loggedIn ? (
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
