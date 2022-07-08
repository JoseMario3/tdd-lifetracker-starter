import * as React from "react";
import { useAuthContext } from "./auth";
import ApiClient from "../services/apiClient";

export const NutritionContext = React.createContext();

export function useNutritionContext() {
  return React.useContext(NutritionContext);
}

export const NutritionContextProvider = ({ children }) => {
  const [nutritions, setNutritions] = React.useState([]);
  const [initialized, setInitialized] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const { user, authed } = useAuthContext();

  function addNutrition(newNutrition) {
    this.setNutritions((prev) => ({
      nutritions: [...prev.nutritions, newNutrition]
    }))
  }

  async function fetchNutrition() {
    const { data, error } = await ApiClient.getNutrition();
    if (data) setNutritions({ ...data.user });
    if (error) setError(error);
    setIsLoading(false);
    setIsProcessing(false);
    setInitialized(true);
  }

  React.useEffect(() => {
    setError(null);
    if(authed) {
        setIsLoading(true);
        setIsProcessing(true);
        fetchNutrition();
    }
    setIsProcessing(false);
    setIsLoading(false);
  });

  return (
    <NutritionContext.Provider
      value={{ nutritions, setError, initialized, isLoading, isProcessing, error, addNutrition }}
    >
      {children}
    </NutritionContext.Provider>
  );
};
