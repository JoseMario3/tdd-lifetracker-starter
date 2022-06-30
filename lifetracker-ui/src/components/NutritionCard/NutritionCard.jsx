import * as React from "react";
import "./NutritionCard.css";

export default function NutritionCard(props) {
  return (
    <div className="nutrition-card">
      <h1 className="nutrition-name">name</h1>
      <img className="nutrition-image" />
      <p className="nutrition-calories">calories</p>
      <p className="nutrition-category">category</p>
      <p className="nutrition-date">createdAt</p>
    </div>
  );
}
