import * as React from "react";
import { useActivityContext, ActivityContextProvider } from "../../contexts/activity";
import { AuthContextProvider } from "../../contexts/auth";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import "./ActivityPage.css";

export default function ActivityContainer() {
  return (
    <ActivityContextProvider>
      <AuthContextProvider>
        <ActivityPage />
      </AuthContextProvider>
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
