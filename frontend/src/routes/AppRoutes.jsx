import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TrackingPage from "../pages/TrackingPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/track/:trackingId"
        element={<TrackingPage />}
      />
    </Routes>
  );
}