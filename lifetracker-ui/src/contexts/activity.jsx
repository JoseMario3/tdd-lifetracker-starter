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
    const [isLoading, setIsLoading] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [error, setError] = React.useState({});
    const { authStates } = useAuthContext();
    const activityStates = { error, activity, initialized, isProcessing }

    async function fetchActivity() {
        const { data, error } = await ApiClient.getActivity();
        if (data) setActivity({ ...data.user });
        if (error) setError(error);
        setIsLoading(false);
        setIsProcessing(false);
        setInitialized(true);
    }

    React.useEffect(() => {
        setIsLoading(true);
        setIsProcessing(true);
        setError(null);
        if(authStates.authed) {
            fetchActivity();
        }
        setIsProcessing(false);
        setIsLoading(false);
    })

    return (
        <ActivityContext.Provider value={{ activityStates }} >
          {children}
        </ActivityContext.Provider>
      );

}
