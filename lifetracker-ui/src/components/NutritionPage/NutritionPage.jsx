import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NutritionOverview from "./../NutritionOverview/NutritionOverview";
import { useNutritionContext } from "../../contexts/nutrition";
import ApiClient from "../../services/apiClient"
import { NutritionContextProvider } from "../../contexts/nutrition";
import { useAuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import NutritionNew from "./../NutritionNew/NutritionNew";
//import NutritionDetail from "./../NutritionDetail/NutritionDetail";
import NotFound from "./../NotFound/NotFound";
import "./NutritionPage.css";

export default function NutritionContainer() {
  return(
  <NutritionContextProvider>
    <NutritionPage />
  </NutritionContextProvider>
  )
}

function NutritionPage() {
  const { nutritionStates } = useNutritionContext();
  const { authStates } = useAuthContext();
  const nutritions = nutritionStates.nutritions;

  React.useEffect(() => {
    nutritionStates.setError(null);
    if(authStates.authed) {
      nutritionStates.setIsLoading(true);
      nutritionStates.setIsProcessing(true);
      fetchNutrition();
    }
    nutritionStates.setIsProcessing(false);
    nutritionStates.setIsLoading(false);
  },[]);

  async function fetchNutrition() {
    const { data, error } = await ApiClient.getNutrition();
    if (data) nutritionStates.setNutritions(data.nutritions);
    if (error) nutritionStates.setError(error);
    nutritionStates.setIsLoading(false);
    nutritionStates.setIsProcessing(false);
    nutritionStates.setInitialized(true);
  }

  return (
    <div className="nutrition-page">
      <div className="banner">
        <h1>Nutrition</h1>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<NutritionOverview nutritions={nutritions} />} />
          <Route path="/create" element={<NutritionNew />} />
          <Route
            path="/id/:nutritionId"
            element={/*<NutritionDetail />*/ null}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
