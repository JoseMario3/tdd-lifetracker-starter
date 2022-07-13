import * as React from "react";
import NutritionCard from "./../NutritionCard/NutritionCard";
import { useNutritionContext } from "../../contexts/nutrition";
import "./NutritionFeed.css";

export default function NutritionFeed() {
  const { nutritionStates } = useNutritionContext();
  const nutritions = nutritionStates.nutritions;
  return (
    <div className="nutrition-feed">
      { nutritions?.length === 0 ? (
        <div className="empty-message">
          <h2>Nothing here yet.</h2>
        </div>
        ) : (nutritions.map((card, idx) => {
          return <NutritionCard nutrition={card} key={idx}/>
          })) } 
    </div>
  );
}
