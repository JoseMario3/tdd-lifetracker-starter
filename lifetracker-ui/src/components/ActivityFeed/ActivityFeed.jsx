import * as React from "react";
import "./ActivityFeed.css";
import SummaryStat from "./../SummaryStat/SummaryStat";
import { useActivityContext } from "../../contexts/activity";
import { Link } from "react-router-dom";

export default function ActivityFeed({perDay, perCategory}) {
  return (
    <div className="activity-feed">
      <div className="actions">
        <h2 className="heading">Activity Feed</h2>
        <div className="buttons">
          <button className="exercise-button">Add Exercise</button>
          <button className="sleep-button">Log Sleep</button>
          <Link to="/nutrition/create">
            <button className="nutrition-button">Record Nutrition</button>
          </Link>
        </div>
      </div>
      <div className="stats">
        <div className="main">
          <h1>Total Calories Per Day</h1>
          <div className="per">
            {(perDay) ? (perDay.map((day, idx) => {
              return <SummaryStat key={idx} date={day.date} calories={day.totalCalories}/>
            })) : (<h3>No calories per day to show</h3>) }
          </div>
        </div>
        <div className="more">
          <h1>Average Calories Per Category</h1>
          <div className="per">
            {(perCategory) ? (perCategory.map((category, idx) => {
              return <SummaryStat key={idx} category={category.category} calories={category.avgCaloriesPerCategory} />
            })) : (<h3>No average calories per category to show</h3>) }
          </div>
        </div>
      </div>
    </div>
  );
}
