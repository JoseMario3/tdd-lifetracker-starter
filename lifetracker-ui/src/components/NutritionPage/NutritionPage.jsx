import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NutritionOverview from "./../NutritionOverview/NutritionOverview";
import NutritionNew from "./../NutritionNew/NutritionNew";
import NutritionDetail from "./../NutritionDetail/NutritionDetail";
import NotFound from "./../NotFound/NotFound";
import "./NutritionPage.css";

export default function NutritionPage() {
  return (
    <div className="nutrition-page">
      <Routes>
        <Route path="/nutrition" element={<NutritionOverview />} />
        <Route path="/nutrition/create" element={<NutritionNew />} />
        <Route
          path="/nutrition/id/:nutritionId"
          element={<NutritionDetail />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
