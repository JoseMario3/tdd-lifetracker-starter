import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NutritionOverview from "./../NutritionOverview/NutritionOverview";
import { NutritionContextProvider } from "../../contexts/nutrition";
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
  return (
    <div className="nutrition-page">
      <div className="banner">
        <h1>Nutrition</h1>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<NutritionOverview />} />
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
