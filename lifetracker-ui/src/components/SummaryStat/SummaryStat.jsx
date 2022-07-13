import * as React from "react";
import "./SummaryStat.css";

export default function SummaryStat({date, category, calories}) {
  let intCalories = parseInt(calories);
  return (
    <div className="summary-stat">
      {date ? (
        <div className="per-day">
          <h1>{date}</h1>
          <p>{intCalories}</p>
        </div>
      ):(
        <div className="per-category">
          <h1>{category}</h1>
          <p>{intCalories}</p>
        </div>
      )}
    </div>
  );
}
