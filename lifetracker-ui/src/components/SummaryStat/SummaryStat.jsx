import * as React from "react";
import "./SummaryStat.css";

export default function SummaryStat({date, category, calories}) {
  return (
    <div className="summary-stat">
      {date ? (
        <div className="perDay">
          <h1>{date}</h1>
          <p>{calories}</p>
        </div>
      ):(
        <div className="perCategory">
          <h1>{category}</h1>
          <p>{calories}</p>
        </div>
      )}
    </div>
  );
}
