import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";

export const NutritionContext = createContext();
export const NutritionContextProvider = ({ children }) => {
  const { user, loggedIn } = useContext(AuthContext);

  const [nutritions, setNutritions] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  /*
  useEffect(() => {
    const getNutrition = async () => {
      if (loggedIn) {
        setIsLoading(true);
      }

      try {
        setIsProcessing(true);
        setError(null);
        const response = await axios.get("http://localhost:3001/"); //nutritions
        console.log(response.data);
        if (response?.data) {
          setNutritions(response.data);
        }
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
      setInitialized(true);
    };

    getNutrition();
  }, []);
*/
  return (
    <NutritionContext.Provider
      value={{ nutritions, initialized, isLoading, error }}
    >
      {children}
    </NutritionContext.Provider>
  );
};
