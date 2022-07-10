import React from "react";
import LoginForm from "./../LoginForm/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import "./LoginPage.css";

export default function LoginPage() {
  const { authStates } = useAuthContext();
  return (
    <div>
      {authStates.authed
        ? (<Navigate to="/activity" />) : 
        (<div className="login-page">
        <LoginForm />
      </div>)}
    </div>
  )

}
