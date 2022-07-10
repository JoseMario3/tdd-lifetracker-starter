import React, { createContext, useState, useEffect, useContext } from "react";
import ApiClient from "../services/apiClient";

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState({});
  const authStates = { error, setError, user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, authed, setAuthed }
  const authFunctions = { loginUser, signupUser, fetchUserFromToken, logoutUser }

  function loginUser(person) {
    setAuthed(true);
    setUser({ ...person.user });
  }

  function signupUser(person) {
    setAuthed(true);
    setUser(person);
  }

  async function fetchUserFromToken() {
    const { data, error } = await ApiClient.fetchUserFromToken();
    if (data) setUser({ ...data.user });
    if (error) setError(error);
    setIsProcessing(false);
    setInitialized(true);
  }

  function logoutUser() {
    setInitialized(false);
    setAuthed(false);
    ApiClient.setToken("null");
    localStorage.setItem(this.tokenName, "null");
    setUser({});
  }

  useEffect(() => {
    const token = localStorage.getItem("lifetracker_token");

    if (token !== "null") {
      setIsProcessing(true);
      setError(null);
      ApiClient.setToken(token);
      fetchUserFromToken();
      setAuthed(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authStates, authFunctions }}>
      {children}
    </AuthContext.Provider>
  );
};
