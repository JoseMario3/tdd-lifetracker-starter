import * as React from "react";
import { Link } from "react-router-dom";
import "./Navlinks.css";

export default function Navlinks(props) {
  function handleSignOut() {
    props.setLoggedIn(false);
  }

  return (
    <ul className="links">
      <li>
        <Link to={props.loggedIn ? "/activity" : "/login"}>Activity</Link>
      </li>
      <li>
        <Link to={props.loggedIn ? "/excercise" : "/login"}>Exercise</Link>
      </li>
      <li>
        <Link to={props.loggedIn ? "/nutrition" : "/login"}>Nutrition</Link>
      </li>
      <li>
        <Link to={props.loggedIn ? "/sleep" : "/login"}>Sleep</Link>
      </li>
      {props.loggedIn ? (
        <li className="signout-button">
          <Link to="/" onClick={handleSignOut}>
            Sign Out
          </Link>
        </li>
      ) : (
        <div className="notlogged">
          <li>
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
