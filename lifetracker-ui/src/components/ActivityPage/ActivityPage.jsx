import * as React from "react";
import { useActivityContext } from "../../contexts/activity";
import Loading from "../Loading/Loading";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import "./ActivityPage.css";

export default function ActivityPage() {

  const { activity,isProcessing } = useActivityContext();

  return (
    <div className="activity-page">
      { isProcessing ? (<Loading />) : (<ActivityFeed />) }
    </div>
  );
}
