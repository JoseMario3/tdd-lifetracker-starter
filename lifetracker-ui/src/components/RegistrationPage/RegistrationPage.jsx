import * as React from "react";
import "./RegistrationPage.css";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import RegistrationForm from "components/RegistrationForm/RegistrationForm";

export default function RegistrationPage() {
  const { authed } = useAuthContext();
  return (
    <div>
      {authed
        ? (<Navigate to="/activity" />) : 
        (<div className="registration-page">
        <RegistrationForm />
      </div>)}
    </div>
  )
}
