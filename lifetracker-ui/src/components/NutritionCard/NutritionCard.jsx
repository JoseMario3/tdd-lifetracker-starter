import * as React from "react";
import { useNutritionContext } from "../../contexts/nutrition";
import "./NutritionCard.css";

export default function NutritionCard({nutrition}) {
  return (
    <div className="nutrition-card">
      <div className="card-header">
        {nutrition.image_url ? (<img className="nutrition-image" src={nutrition.image_url}/>) : (null) }
        <h2 className="nutrition-name">{nutrition.name}</h2>
      </div>
      <div className="card-stats">
        <div className="card-stat">
          <p>Calories</p>
          <span className="nutrition-calories">{nutrition.calories}</span>
        </div>
        <div className="card-stat">
          <p>Quantity</p>
          <span className="nutrition-quantity">{nutrition.quantity}</span>
        </div>
      </div>
      <div className="card-meta">
        <small className="nutrition-category">{nutrition.category}</small>
      </div>
    </div>
  );
}
