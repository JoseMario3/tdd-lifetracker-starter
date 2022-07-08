import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage";
//import NutritionPage from "../NutritionPage/NutritionPage";
//import AccessForbidden from "../AccessForbidden/AccessForbidden";
import NotFound from "../NotFound/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
//import ApiClient from "../../services/apiClient";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <AuthContextProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              {/*<Route path="/nutrition/*" element={<NutritionPage />} />
              <Route path="/nutrition" element={<AccessForbidden />} />*/}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthContextProvider>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}
