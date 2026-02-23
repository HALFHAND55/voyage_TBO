import { Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import DashboardRoutes from "./DashboardRoutes";
import VendorRoutes from "./VendorRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {PublicRoutes()}
      {DashboardRoutes()}
      {VendorRoutes()}
    </Routes>
  );
};

export default AppRoutes;