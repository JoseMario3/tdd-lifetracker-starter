import * as React from "react";
import { useNutritionContext } from "../../contexts/nutrition";
import "./NutritionCard.css";

export default function NutritionCard({nutrition}) {
  return (
    <div className="nutrition-card">
      <h1 className="nutrition-name">{nutrition.name}</h1>
      {nutrition.imageUrl ? (<img className="nutrition-image" src={nutrition.imageUrl}/>) : (null) }
      <p className="nutrition-calories">{nutrition.calories}</p>
      <p className="nutrition-category">{nutrition.category}</p>
      <p className="nutrition-date">{nutrition.createdAt}</p>
    </div>
  );
}
