import * as React from "react";
import { Link } from "react-router-dom";
import rednosign from "../../assets/rednosign.png"
import "./AccessForbidden.css";

export default function AccessForbidden() {
    return (
        <div className="access-forbidden">
            <div className="hero">
                <img src={rednosign} alt="red no sign" className="no-img" />
            </div>
            <div className="content">
                <h1>You must be logged in to access this page</h1>
                <Link to="/login" className="login">Login Here</Link>
            </div>
        </div>
    )
}