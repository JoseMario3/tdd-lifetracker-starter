import * as React from "react";
import exerciselogo from "../../assets/exercise-logo.png";
import { Link } from "react-router-dom";
import Navlinks from "../Navlinks/Navlinks";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="content">
        <div className="logo">
          <Link to="/">
            <img src={exerciselogo} className="logo-img" alt="logo" />
          </Link>
        </div>
        <Navlinks />
      </div>
    </nav>
  );
}
