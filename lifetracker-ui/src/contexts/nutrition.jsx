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
  const { authStates } = useAuthContext();
  const nutritionStates = { nutritions, setError, initialized, isLoading, isProcessing, error, setIsProcessing, setInitialized, setIsLoading, setNutritions };
  const nutritionFunctions = { addNutrition }

  function addNutrition(newNutrition) {
    this.setNutritions((prev) => ({
      nutritions: [...prev.nutritions, newNutrition]
    }))
  }

  return (
    <NutritionContext.Provider value={{ nutritionStates, nutritionFunctions }}>
      {children}
    </NutritionContext.Provider>
  );
};
