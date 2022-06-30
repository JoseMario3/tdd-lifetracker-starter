import * as React from "react";
import "./SummaryStat.css";

export default function SummaryStat(props) {
  return (
    <div className="summary-stat">
      <div className="primary-statistic">{props}</div>
      <div className="stat-label">{props}</div>
      <div className="secondary-statistic">{props}</div>
    </div>
  );
}
