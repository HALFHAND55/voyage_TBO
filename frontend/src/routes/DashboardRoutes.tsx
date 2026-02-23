// src/routes/DashboardRoutes.tsx
import { Route } from "react-router-dom";
import HostDashboard from "../pages/HostDashboard";
import GuestDashboard from "../pages/GuestDashboard";

const DashboardRoutes = () => (
  <>
    <Route path="host/dashboard" element={<HostDashboard />} />
    <Route path="guest/dashboard" element={<GuestDashboard />} />
  </>
);

export default DashboardRoutes;