import * as React from "react";
import "./RegistrationPage.css";
import RegistrationForm from "components/RegistrationForm/RegistrationForm";

export default function RegistrationPage(props) {
  return (
    <div className="registration-page">
      <RegistrationForm
        setLoggedIn={props.setLoggedIn}
        setAppState={props.setAppState}
      />
    </div>
  );
}
