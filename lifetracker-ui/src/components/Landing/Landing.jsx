import * as React from "react";
import smartwatch from "../../assets/smartwatch.svg";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="content">
        <div className="hero">
          <img src={smartwatch} alt="hero image" className="hero-img" />
        </div>
        <div className="cta">
          <h1>Life Tracker</h1>
          <p>Helping you take back control of your world</p>
        </div>
      </div>
    </div>
  );
}
