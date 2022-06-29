import * as React from "react";
import codepathlogo from "../../assets/codepath-logo.svg";
import { Link } from "react-router-dom";
import Navlinks from "../Navlinks/Navlinks";
import "./Navbar.css";

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="content">
        <div className="logo">
          <Link to="/">
            <img src={codepathlogo} alt="logo" />
          </Link>
        </div>
        <Navlinks loggedIn={props.loggedIn} />
      </div>
    </nav>
  );
}
