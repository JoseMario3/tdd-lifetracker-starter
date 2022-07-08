import * as React from "react";
import "./RegistrationPage.css";
import { Navigate } from "react-router-dom";
import RegistrationForm from "components/RegistrationForm/RegistrationForm";

export default function RegistrationPage() {
  const { authed } = useAuthContext();
  return (
    <div>
      {authed
        ? (<Navigate to="/activity" />) : 
        (<div className="login-page">
        <RegistrationForm />
      </div>)}
    </div>
  )
}
