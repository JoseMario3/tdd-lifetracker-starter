import * as React from "react";
import "./ActivityFeed.css";
import SummaryStat from "./../SummaryStat/SummaryStat";

export default function ActivityFeed(props) {
  return (
    <div className="activity-feed">
      <div className="per-category">
        <h4>Average Calories Per Category</h4>
      </div>
      <div className="per-day">
        <h4>Total Calories Per Day</h4>
      </div>
    </div>
  );
}
