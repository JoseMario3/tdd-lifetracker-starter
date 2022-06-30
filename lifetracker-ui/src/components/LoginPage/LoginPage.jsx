import * as React from "react";
import LoginForm from "./../LoginForm/LoginForm";
import "./LoginPage.css";

export default function LoginPage(props) {
  return (
    <div className="login-page">
      <LoginForm
        setLoggedIn={props.setLoggedIn}
        setAppState={props.setAppState}
      />
    </div>
  );
}
