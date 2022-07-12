import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityContainer from "../ActivityPage/ActivityPage";
import NutritionContainer from "../NutritionPage/NutritionPage";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import NotFound from "../NotFound/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../../contexts/auth";
import "./App.css";

export default function AppContainer() {
  return (
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
  );
}

function App() {
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/activity" element={<ActivityContainer />} />
            <Route path="/nutrition/*" element={<NutritionContainer />} />
            <Route path="/forbidden" element={<AccessForbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
