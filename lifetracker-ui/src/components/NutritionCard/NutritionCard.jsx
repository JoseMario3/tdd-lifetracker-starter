import * as React from "react";
import { useNutritionContext } from "../../contexts/nutrition";
import "./NutritionCard.css";

export default function NutritionCard(props) {
  return (
    <div className="nutrition-card">
      <h1 className="nutrition-name">{props.nutrition.name}</h1>
      {props.nutrition.imageUrl ? (<img className="nutrition-image" src={props.nutrition.imageUrl}/>) : (null) }
      <p className="nutrition-calories">{props.nutrition.calories}</p>
      <p className="nutrition-category">{props.nutrition.category}</p>
      <p className="nutrition-date">{props.nutrition.createdAt}</p>
    </div>
  );
}
