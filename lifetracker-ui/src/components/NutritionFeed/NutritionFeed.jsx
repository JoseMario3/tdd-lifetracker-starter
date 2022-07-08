import * as React from "react";
import NutritionCard from "./../NutritionCard/NutritionCard";
import { useNutritionContext } from "../../contexts/nutrition";
import "./NutritionFeed.css";

export default function NutritionFeed(props) {
  const { nutritions } = useNutritionContext();
  return (
    <div className="nutrition-feed">
      { nutritions.length === 0 ? (
        <div class="empty">
          <h2>Nothing here yet.</h2>
        </div>
        ) : (null) } 
    </div>
  );
}
