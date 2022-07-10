import * as React from "react";
import NutritionCard from "./../NutritionCard/NutritionCard";
import { useNutritionContext } from "../../contexts/nutrition";
import "./NutritionFeed.css";

export default function NutritionFeed() {
  const { nutritionStates } = useNutritionContext();
  return (
    <div className="nutrition-feed">
      { nutritionStates.nutritions.length === 0 ? (
        <div className="empty-message">
          <h2>Nothing here yet.</h2>
        </div>
        ) : (nutritionStates.nutritions.map((card) => {
          <NutritionCard nutrition={card}/>
        })) } 
    </div>
  );
}
