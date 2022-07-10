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

  return (
    <div className="activity-page">
      { activityStates.isProcessing ? (<Loading />) : (<ActivityFeed />) }
    </div>
  );
}
