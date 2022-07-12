import * as React from "react";
import NutritionCard from "./../NutritionCard/NutritionCard";
import "./NutritionFeed.css";

export default function NutritionFeed({nutritions}) {

  return (
    <div className="nutrition-feed">
      { nutritions.length === 0 ? (
        <div className="empty-message">
          <h2>Nothing here yet.</h2>
        </div>
        ) : (nutritions.map((card, idx) => {
          return <NutritionCard nutrition={card} key={idx}/>
          })) } 
    </div>
  );
}
