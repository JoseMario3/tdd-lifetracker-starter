import * as React from "react";
import { useActivityContext, ActivityContextProvider } from "../../contexts/activity";
import Loading from "../Loading/Loading";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import "./ActivityPage.css";

export default function ActivityContainer() {
  return (
    <ActivityContextProvider>
      <ActivityPage />
    </ActivityContextProvider>
  )
}

function ActivityPage() {
  const { activityStates } = useActivityContext();
  const perDay = activityStates.activity.perDay ? activityStates.activity.perDay : [];
  const perCategory = activityStates.activity.perCategory ? activityStates.activity.perCategory : [];
  return (
    <div className="activity-page">
      <ActivityFeed perDay={perDay} perCategory={perCategory} />
    </div>
  );
}
