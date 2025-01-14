import * as React from "react";
import { useAuthContext } from "./auth";
import ApiClient from "../services/apiClient"

export const ActivityContext = React.createContext();

export function useActivityContext() {
    return React.useContext(ActivityContext);
}

export const ActivityContextProvider = ({children}) => {
    const [activity, setActivity] = React.useState({});
    const [initialized, setInitialized] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isProcessing, setIsProcessing] = React.useState(true);
    const [error, setError] = React.useState({});
    const activityStates = { error, activity, initialized, isProcessing };

    async function fetchActivity() {
        const { data, error } = await ApiClient.getActivity();
        if (data) setActivity(data.calories);
        if (error) setError(error);
        setIsLoading(false);
        setInitialized(true);
    }

    React.useEffect(() => {
        setIsProcessing(true);
        setIsLoading(true);
        setError(null);
        if(isLoading) {
            fetchActivity();
            setIsProcessing(false);
        }
        setIsLoading(false);
    },[])

    return (
        <ActivityContext.Provider value={{ activityStates }} >
          {children}
        </ActivityContext.Provider>
      );

}
