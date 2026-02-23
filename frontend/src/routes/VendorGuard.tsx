import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const VendorGuard = () => {
  const { vendor, loading } = useAuth();

  if (loading) return null;

  if (!vendor) {
    return <Navigate to="/vendor/login" replace />;
  }

  return <Outlet />;
};

export default VendorGuard;