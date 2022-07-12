import * as React from "react";
import { Link } from "react-router-dom";
import { useNutritionContext } from "../../contexts/nutrition";
import NutritionFeed from "../NutritionFeed/NutritionFeed";
import Loading from "../Loading/Loading";
import "./NutritionOverview.css";

export default function NutritionOverview({nutritions}) {
  const nutritionStates = useNutritionContext();

  return (
    <div className="nutrition-overview">
      {nutritionStates.error?.form && (<span className="error">{nutritionStates.error.form}</span>)}
      <div className="header">
        <h3>Overview</h3>
        <Link to="/nutrition/create" className="record">Record Nutrition</Link>
      </div>
      { nutritionStates.isLoading ? (<Loading />) : (<NutritionFeed nutritions={nutritions}/>) }
    </div>
  );
}
