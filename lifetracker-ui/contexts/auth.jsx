import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

/*
export function useAuthContext() {
  const context = React.useContext(AuthContext);
  return context;
}
*/

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState({});

  function loginUser(person) {
    setLoggedIn(true);
    setUser({ ...person.user });
  }

  function signupUser(person) {
    setLoggedIn(true);
    setUser(person);
  }

  function fetchUserFromToken() {
    return 0;
  }

  function logoutUser() {
    setLoggedIn(false);
    setUser({});
  }
  /*
  useEffect(() => {
    const getUser = async () => {
      // if (lifetracker_token) {
      //add to apiClient with setToken method
      //}

      try {
        setIsProcessing(true);
        setError(null);
        const response = await axios.get("http://localhost:3001");
        console.log(response.data);
      } catch (error) {
        setError(error);
      }

      setIsProcessing(false);
      setInitialized(true);
    };

    getUser();
  }, []);
*/
  return (
    <AuthContext.Provider
      value={{
        error,
        setError,
        user,
        setUser,
        initialized,
        setInitialized,
        isProcessing,
        setIsProcessing,
        loginUser,
        signupUser,
        fetchUserFromToken,
        logoutUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
