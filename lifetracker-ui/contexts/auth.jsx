import * as React from "react";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(defaultValue);

export default function AuthContextProvider() {
  const [user, setUser] = useState(AuthContext.Provider.value);
  const [initialized, setInitialized] = useState(AuthContext.Provider.value);
  const [isProcessing, setIsProcessing] = useState(AuthContext.Provider.value);
  const [error, setError] = useState(AuthContext.Provider.value);

  function loginUser() {
    return 0;
  }

  function signupUser() {
    return 0;
  }

  function fetchUserFromToken() {
    return 0;
  }

  function logoutUser() {
    return 0;
  }

  useEffect(() => {});
}
